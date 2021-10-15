let renderError = ({error, touched}) => {
    if(touched && error) {
        return (
            <div className="d-block invalid-feedback">
                {error}
            </div> 
        )
    }
}

export let renderInput = ({ input, label, meta }) => {
    let className = meta.touched && meta.error ? 'form-control is-invalid' : 'form-control';
    
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input {...input} className={className} autoComplete="off" />
            {renderError(meta)} 
        </div>
        
    );
}