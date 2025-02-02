import { WhyDoThis } from './main-page_ui/whyDoThis';

const Title = () => {
  return (
    <div style={{
      border: '2px solid var(--border-color)',
      padding: '10px',
      display: 'inline-block',
      margin: '20px',
      position: 'relative'
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
          follow me back
        </span><br /> 
      </h1>
      <div style={{
        position: 'absolute',
        
        bottom: '-30px',
        right: '-20px'
      }}>
        <WhyDoThis />
      </div>
    </div>
  );
};

export default Title; 
