const Title = () => {
  return (
    <div style={{
      border: '2px solid var(--border-color)',
      padding: '10px',
      display: 'inline-block',
      margin: '20px'
    }}>
      <h1 style={{ 
        fontSize: 'calc(100vw / 10)', 
        color: 'var(--text-color)', 
        textAlign: 'left', 
        fontFamily: 'JetBrains Mono', 
        fontWeight: 'bold', 
        lineHeight: '1', 
        margin: '0',
        padding: '5px'
      }}>
        <span style={{ 
          padding: '2px', 
          margin: '5px'
        }}>
          follow all
        </span><br />your followers
      </h1>
    </div>
  );
};

export default Title; 

