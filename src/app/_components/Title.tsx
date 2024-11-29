const Title = () => {
  return (
    <div style={{
      border: '2px solid white',
      padding: '10px',
      display: 'inline-block'
    }}>
      <h1 style={{ 
        fontSize: 'calc(100vw / 10)', 
        color: 'white', 
        textAlign: 'left', 
        fontFamily: 'JetBrains Mono', 
        fontWeight: 'bold', 
        lineHeight: '1', 
        margin: '0'
      }}>
        Follow All<br />Your Followers
      </h1>
    </div>
  );
};

export default Title; 

