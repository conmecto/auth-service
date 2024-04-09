import { createClient } from 'redis';
import { Environments, enums } from '../utils';
import { 
    handleMatchCreateErrorMessage, handleProfileCreateErrorMessage,
    createMatchCreatedPushNotification 
} from '../services';

const redisClient1 = createClient({
    socket: {
        host: Environments.redis.host,
        port: Environments.redis.port,
        connectTimeout: Environments.redis.connectTimeout
    },
    username: Environments.redis.username, 
    password: Environments.redis.password
});

const redisClient2 = createClient({
    socket: {
        host: Environments.redis.host,
        port: Environments.redis.port,
        connectTimeout: Environments.redis.connectTimeout
    },
    username: Environments.redis.username, 
    password: Environments.redis.password
});

(async function connect() {
    await redisClient1.connect(); 
    console.log(enums.PrefixesForLogs.REDIS_CONNECTION_READY_CLIENT1 + redisClient1.isReady);
    if (redisClient1.isReady) {
        const country = 'india';
        const cities = 'Agartala,Agra,Ahmedabad,Aizawl,Ajmer,Ambala,Amritsar,Andaman and Nicobar Islands,Asansol,Aurangabad,Bahadurgarh,Balasore,Bareilly,Bathinda,Belgavi,Bengaluru,Bhavnagar,Bhilai,Bhopal,Bhubaneswar,Bikaner,Bilaspur,Chamba,Champhai,Chandigarh,Chennai,Chümoukedima,Coimbatore,Cuttack,Dadra and Nagar Haveli and Daman and Diu,Dehradun,Delhi,Dhanbad,Dharamsala,Dharwad,Dibrugarh,Dimapur,Dispur,Durgapur,Faridabad,Gandhinagar,Gangtok,Gaya,Ghaziabad,Gorakhpur,Guntur,Gurugram,Guwahati,Gwalior,Haldwani,Hamirpur,Haridwar,Hisar,Hoshiarpur,Howrah,Hubballi,Hyderabad,Imphal,Indore,Itanagar,Jabalpur,Jaipur,Jaisalmer,Jalandhar,Jalgaon,Jammu & Kashmir,Jamshedpur,Jhansi,Jodhpur,Jorhat,Kakinada,Kannur,Kanpur,Karnal,Kharagpur,Kochi,Kohima,Kolhapur,Kolkata,Kollam,Kota,Kozhikode,Kullu,Kurukshetra,Ladakh,Lakshadweep,Lucknow,Ludhiana,Lunglei,Madurai,Manali,Mandi,Mangaluru,Mapusa,Margao,Mawlai,Meerut,Mokokchung,Mormugao,Mumbai,Mysuru,Nagpur,Namchi,Nashik,Nizamabad,Noida,Palakkad,Panaji,Panipat,Pasighat,Patiala,Patna,Pilani,Prayagraj,Puducherry,Pune,Puri,Raipur,Rajkot,Ranchi,Ravangla,Rishikesh,Rohtak,Roorkee,Ropar,Rourkela,Salem,Shillong,Shimla,Silchar,Siliguri,Solapur,Sonipat,Surat,Tadepalligudem,Tawang,Tezpur,Thiruvananthapuram,Thoubal,Thrissur,Tinsukia,Tiruchirappalli,Tirunelveli,Tirupati,Tura,Udaipur,Udupi,Ujjain,Ukhrul,Vadodara,Varanasi,Vellore,Vijayawada,Vizag,Warangal,Yupia'
        await redisClient1.set(country, cities);
    }
})();

(async function connect() {
    await redisClient2.connect(); 
    console.log(enums.PrefixesForLogs.REDIS_CONNECTION_READY_CLIENT2 + redisClient2.isReady);
    if (redisClient2.isReady) {
        await redisClient2.subscribe(Environments.redis.channels.userCreatedProfileError, handleProfileCreateErrorMessage);
        await redisClient2.subscribe(Environments.redis.channels.userCreatedMatchError, handleMatchCreateErrorMessage);
        await redisClient2.subscribe(Environments.redis.channels.matchCreatedNotification, createMatchCreatedPushNotification);
    }
})();

redisClient1.on('error', (err) => {
    redisClient1.disconnect();
    console.error(enums.PrefixesForLogs.REDIS_CONNECTION_ERROR_CLIENT1 + err);
});

redisClient2.on('error', (err) => {
    redisClient2.disconnect();
    console.error(enums.PrefixesForLogs.REDIS_CONNECTION_ERROR_CLIENT2 + err);
});

export { redisClient1, redisClient2 };
