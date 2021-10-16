let renderError = ({error, touched}) => {
    if(touched && error) {
        return (
            <div className="d-block invalid-feedback">
                {error}
            </div> 
        )
    }
}

export let renderInput = ({ input, meta, label }) => {
    let className = meta.touched && meta.error ? 'form-control is-invalid' : 'form-control';
    console.log('>>>>>>',meta)
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input {...input} className={className} autoComplete="off" />
            {renderError(meta)} 
        </div>
        
    );
}