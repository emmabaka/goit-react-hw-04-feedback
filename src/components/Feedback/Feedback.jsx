import { useState } from 'react';
import Statistic from 'components/Statistic.jsx/Statistic';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = e => {
    const value = e.target.textContent;
    if (value === 'Good') setGood(prev => prev + 1);
    if (value === 'Neutral') setNeutral(prev => prev + 1);
    if (value === 'Bad') setBad(prev => prev + 1);
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const positive = Math.round((good * 100) / total);
    if (total === 0) return 0;
    return `${positive}%`;
  };

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions onLeaveFeedback={handleClick} />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() !== 0 ? (
          <Statistic
            values={{ good, neutral, bad }}
            countTotal={countTotalFeedback}
            countPositive={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default Feedback;
