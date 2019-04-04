import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Loader from '../Loader/Loader';

import styles from './JobDetail.module.css';

/**
 * Displays the details of a job
 * @prop uuid   The id of the job to display
 */
class JobDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      details: {},
      skills: [],
      jobs: []
    }
  }

  componentDidMount () {
    this.fetchData();
  }

  componentDidUpdate (prevProps) {
    const oldId = prevProps.match.params.uuid;
    const newId = this.props.match.params.uuid;
    if (newId !== oldId) {
      this.fetchData();
    }
  }

  componentWillUnmount () {
    this.ignoreLastFetch = true;
  }

  fetchData() {
    this.setState({
      loading: true
    });
    Promise.all([
      axios.get(`jobs/${this.props.match.params.uuid}`),
      axios.get(`jobs/${this.props.match.params.uuid}/related_jobs`),
      axios.get(`jobs/${this.props.match.params.uuid}/related_skills`)
    ]).then(([
      {data: details}, {data: {related_job_titles: jobs}}, {data: {skills}}
    ]) => {
      this.setState({
        loading: false,
        details,
        jobs,
        skills
      });
    });
  }

  render() {
    const skills = this.state.skills.map((skill) =>
      <li key={skill.skill_uuid}>
        <Link to={`/skills/${skill.skill_uuid}`}>{skill.skill_name}</Link>
      </li>
    );
    const jobs = this.state.jobs.map((job) =>
      <li key={job.uuid}>
        <Link to={`/jobs/${job.uuid}`}>{job.title}</Link>
      </li>
    );
    if (this.state.loading) {
      return <Loader />
    } else {
      return (
        <div>
          <h2>Job: {this.state.details.title}</h2>

          <div className={styles.detailBlock}>
          {this.state.skills.length > 0 && <div className={styles.detailPanel}>
            <h3>Related Skills</h3>
            <div className={styles.detailPanelList}>
              <ul>
                {skills}
              </ul>
            </div>
          </div>}
          {this.state.jobs.length > 0 && <div className={styles.detailPanel}>
            <h3>Related Jobs</h3>
            <div className={styles.detailPanelList}>
              <ul>
                {jobs}
              </ul>
            </div>
          </div>}
          </div>
        </div>
      );
    }
  }
}

export default JobDetail;
