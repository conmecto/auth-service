import moment from 'moment';

const USER_VERIFIED = 'User verified successfully';
const USER_CREATED = 'User created successfully';
const VERIFICATION_CODE_SENT = 'Verification code sent to your email';

const PAST_DATE_18_YEARS = moment(new Date(Math.floor(new Date().getTime()) - (18*365*24*60*60))).format('DD-MM-YYYY');

export { USER_VERIFIED, PAST_DATE_18_YEARS, USER_CREATED, VERIFICATION_CODE_SENT }