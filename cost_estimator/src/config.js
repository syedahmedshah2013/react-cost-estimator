let env = 'development';

export const config = () => {
    if(env === 'development') {
        return {
            API_BASE_URL: 'https://dl5mns5bwg.execute-api.eu-central-1.amazonaws.com',
        }
    } else if(env === 'stagging') {
        return {
            API_BASE_URL: '<STAGGING_URL>',
        }
    } else {
        return {
            API_BASE_URL: '<PRODUCTION_URL>',
        }
    }
}