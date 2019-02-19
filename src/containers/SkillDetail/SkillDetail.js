import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Loader from '../Loader/Loader';

import styles from './SkillDetail.module.css';

class SkillDetail extends Component {

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

    axios.get(`skills/${this.props.match.params.uuid}`)
      .then(({data: details}) => {
        this.setState({
          loading: false,
          details
        });
      });
    axios.get(`skills/${this.props.match.params.uuid}/related_jobs`)
      .then(
        ({data: {jobs}}) => {
          this.setState({
            jobs
          });
        },
        () => {
          this.setState({
            jobs: []
          });
        }
      );
    axios.get(`skills/${this.props.match.params.uuid}/related_skills`)
      .then(
        ({data: {skills}}) => {
          this.setState({
            skills
          });
        },
        () => {
          this.setState({
            skills: []
          });
        }
      );
  }

  render() {
    const skills = this.state.skills.map((skill) =>
      <li key={skill.uuid}>
        <Link to={`/skills/${skill.uuid}`}>{skill.skill_name}</Link>
      </li>
    );
    const jobs = this.state.jobs.map((job) =>
      <li key={job.job_uuid}>
        <Link to={`/jobs/${job.job_uuid}`}>{job.job_title}</Link>
      </li>
    );
    if (this.state.loading) {
      return <Loader />
    } else {
      return (
        <div>
          <h2>Skill: {this.state.details.skill_name}</h2>

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

export default SkillDetail;
