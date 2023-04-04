import moment from 'moment';

const USER_VERIFIED = 'User verified successfully';
const USER_CREATED = 'User created successfully';
const VERIFICATION_CODE_SENT = 'Verification code sent to your email';
const VERIFICATION_CODE_EMAIL_SUBJECT = 'Verification code';
const VERIFICATION_CODE_EMAIL_TEXT = 'Verification code text';

const PAST_DATE_18_YEARS = moment(new Date(Math.floor(new Date().getTime()) - (18*365*24*60*60))).format('DD-MM-YYYY');

export { USER_VERIFIED, PAST_DATE_18_YEARS, USER_CREATED, VERIFICATION_CODE_SENT, VERIFICATION_CODE_EMAIL_SUBJECT, VERIFICATION_CODE_EMAIL_TEXT }