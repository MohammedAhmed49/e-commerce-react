import './form-input.styles.scss';

const FormInput = ({label, ...inputProps}) => {
  return (
    <div className="group">
        
        <label className={`${inputProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
        <input {...inputProps} className='form-input' />
    </div>
  )
}

export default FormInput;
