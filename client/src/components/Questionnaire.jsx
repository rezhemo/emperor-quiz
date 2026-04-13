import { useState } from 'react';

function Questionnaire({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    satisfaction: 3,
    favoriteFeature: '',
    recommend: '是',
    suggestions: '',
    ageRange: '18-25'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        onSubmitSuccess();
      } else {
        alert('提交失败，请重试');
      }
    } catch (err) {
      console.error('提交错误:', err);
      alert('提交失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label style={styles.label}>1. 你对这个网站的满意度？（1-5分）</label>
        <input
          type="range"
          name="satisfaction"
          min="1"
          max="5"
          value={formData.satisfaction}
          onChange={handleChange}
          style={styles.slider}
        />
        <span style={styles.sliderValue}>{formData.satisfaction} 分</span>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>2. 你最喜欢的功能是什么？</label>
        <input
          type="text"
          name="favoriteFeature"
          value={formData.favoriteFeature}
          onChange={handleChange}
          placeholder="请输入..."
          style={styles.input}
          required
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>3. 你会推荐给朋友吗？</label>
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="recommend"
              value="是"
              checked={formData.recommend === '是'}
              onChange={handleChange}
            />
            是
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="recommend"
              value="否"
              checked={formData.recommend === '否'}
              onChange={handleChange}
            />
            否
          </label>
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>4. 你有什么建议？</label>
        <textarea
          name="suggestions"
          value={formData.suggestions}
          onChange={handleChange}
          placeholder="请输入您的建议..."
          style={styles.textarea}
          rows="3"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>5. 你的年龄范围？</label>
        <select
          name="ageRange"
          value={formData.ageRange}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="18以下">18 以下</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="45以上">45 以上</option>
        </select>
      </div>

      <button type="submit" style={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? '提交中...' : '提交问卷'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px'
  },
  textarea: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    resize: 'vertical'
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px'
  },
  slider: {
    width: '100%'
  },
  sliderValue: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2196F3'
  },
  radioGroup: {
    display: 'flex',
    gap: '20px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer'
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default Questionnaire;
