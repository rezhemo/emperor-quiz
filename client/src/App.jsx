import { useState, useEffect } from 'react';
import Questionnaire from './components/Questionnaire';

function App() {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchResults();
  }, [showResults]);

  const fetchResults = async () => {
    try {
      const res = await fetch('/api/results');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('获取结果失败:', err);
    }
  };

  const handleSubmitSuccess = () => {
    setShowResults(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>用户满意度问卷</h1>
      {!showResults ? (
        <Questionnaire onSubmitSuccess={handleSubmitSuccess} />
      ) : (
        <div style={styles.resultsSection}>
          <h2 style={styles.subtitle}>提交成功！</h2>
          <button style={styles.button} onClick={() => setShowResults(false)}>
            再次填写
          </button>
          <h3 style={styles.resultsTitle}>所有提交结果 ({results.length})</h3>
          <div style={styles.resultsList}>
            {results.map((result, index) => (
              <div key={index} style={styles.resultCard}>
                <p><strong>#{index + 1}</strong> - {result.submittedAt}</p>
                <p>满意度: {result.satisfaction}/5</p>
                <p>最喜欢的功能: {result.favoriteFeature}</p>
                <p>会推荐: {result.recommend}</p>
                <p>建议: {result.suggestions || '无'}</p>
                <p>年龄范围: {result.ageRange}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    color: '#333'
  },
  subtitle: {
    textAlign: 'center',
    color: '#4CAF50'
  },
  resultsSection: {
    textAlign: 'center'
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  resultsTitle: {
    marginTop: '20px'
  },
  resultsList: {
    textAlign: 'left',
    marginTop: '20px'
  },
  resultCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9'
  }
};

export default App;
