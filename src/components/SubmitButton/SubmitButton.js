import './SubmitButton.css';

function SubmitButton({ label, submitPossible }) {
  return (
    <input
      className={`submit-button submit-button_active_${submitPossible}`}
      type='submit'
      value={label}
      disabled={!submitPossible}
    />
  );
}

export default SubmitButton;
