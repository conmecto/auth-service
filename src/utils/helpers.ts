import moment from 'moment';

const getDateWithTimezone = (): string => {
    return moment().format('YYYY-MM-DD HH:mm:ss Z');
}

export { getDateWithTimezone }