import { Component } from 'react';
import Statistic from 'components/Statistic.jsx/Statistic';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

class Feedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClick = e => {
    const value = e.target.textContent;
    this.setState(prev => {
      return { [value]: prev[value] + 1 };
    });
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce((prev, curr) => prev + curr, 0);
  };

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    const positive = Math.round((this.state.good * 100) / total);
    if (total === 0) return 0;
    return `${positive}%`;
  };

  render() {
    const total = this.countTotalFeedback();
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            onLeaveFeedback={this.handleClick}
            options={Object.keys(this.state)}
          />
        </Section>
        <Section title="Statistics">
          {total !== 0 ? (
            <Statistic
              values={this.state}
              countTotal={this.countTotalFeedback}
              countPositive={this.countPositiveFeedbackPercentage}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}
export default Feedback;
