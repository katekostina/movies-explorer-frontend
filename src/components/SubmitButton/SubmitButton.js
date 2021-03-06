import './SubmitButton.css';

function SubmitButton({ label }) {
  return <input className='submit-button' type='submit' value={label} />;
}

export default SubmitButton;
