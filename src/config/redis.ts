import { createClient } from 'redis';
import { Environments, enums } from '../utils';
import { handleMatchCreateErrorMessage, handleProfileCreateErrorMessage } from '../services';

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
        const cities = 'mumbai,delhi,bangalore,hyderabad,gurgaon,noida,ahmedabad,chennai,kolkata,surat,pune,jaipur,lucknow,kanpur,nagpur,indore,thane,bhopal,visakhapatnam,pimpri-chinchwad,patna,vadodara,ghaziabad,ludhiana,agra,nashik,faridabad,meerut,rajkot,kalyan-dombivali,vasai-virar,varanasi,srinagar,aurangabad,dhanbad,amritsar,navi mumbai,allahabad,howrah,ranchi,jabalpur,gwalior,coimbatore,vijayawada,jodhpur,madurai,raipur,kota,guwahati,chandigarh,thiruvananthapuram,solapur,hubballi-dharwad,tiruchirappalli,tiruppur,moradabad,mysore,bareily,aligarh,jalandhar,bhubaneswar,salem,mira-bhayandar,warangal,guntur,bhiwandi,saharanpur,gorakhpur,bikaner,amravati,jamshedpur,bhilai,cuttack,firozabad,kochi,nellore,bhavnagar,dehradun,durgapur,asansol,rourkela,nanded,kolhapur,ajmer,akola,gulbarga,jamnagar,ujjain,loni,siliguri,jhansi,ulhasnagar,jammu,sangli-miraj & kupwad,mangalore,erode,belgaum,ambattur,tirunelveli,malegaon,gaya,jalgaon,udaipur,maheshtala,davanagere,kozhikode,kurnool,rajpur sonarpur,rajahmundry,bokaro,south dumdum,bellary,patiala,gopalpur,agartala,bhagalpur,muzaffarnagar,bhatpara,panihati,latur,dhule,tirupati,rohtak,korba,bhilwara,berhampur,muzaffarpur,ahmednagar,mathura,kollam,avadi,kadapa,kamarhati,sambalpur,bilaspur,shahjahanpur,satara,bijapur,rampur,shivamogga,chandrapur,junagadh,thrissur,alwar,bardhaman,kulti,kakinada,nizamabad,parbhani,tumkur,khammam,ozhukarai,bihar sharif,panipat,darbhanga,bally,aizawl,dewas,ichalkaranji,karnal,bathinda,jalna,eluru,kirari suleman nagar,barasat,purnia,satna,mau,sonipat,farrukhabad,sagar,rourkela,durg,imphal,ratlam,hapur,arrah,karimnagar,anantapur,etawah,ambernath,north dumdum,bharatpur,begusarai,new delhi,gandhidham,baranagar,tiruvottiyur,puducherry,sikar,thoothukudi,rewa,mirzapur,raichur,pali,ramagundam,haridwar,vijayanagaram,katihar,nagarcoil,sri ganganagar,karawal nagar,mango,thanjavur,bulandshahr,uluberia,murwara,sambhal,singrauli,nadiad,secunderabad,naihati,yamunanagar,bidhan nagar,pallavaram,bidar,munger,panchkula,burhanpur,raurkela industrial township,kharagpur,dindigul,gandhinagar,hospet,nangloi jat,malda,ongole,deoghar,chapra,haldia,khandwa,nandyal,chittoor,morena,amroha,anand,bhind,bhalswa jahangir pur,madhyamgram,bhiwani,navi mumbai panvel raigad,baharampur,ambala,morvi,fatehpur,rae bareli,khora,bhusawal,orai,bahraich,vellore,mahesana,sambalpur,raiganj,sirsa,danapur,serampore,sultan pur majra,guna,jaunpur,panvel,shivpuri,surendranagar dudhrej,unnao,hugli and chinsurah,alappuzha,kottayam,machilipatnam,shimla,adoni,tenali,proddatur,saharsa,hindupur,sasaram,hajipur,bhimavaram,dehri,madanapalle,siwan,bettiah,guntakal,srikakulam,motihari,dharmavaram,gudivada,narasaraopet,bagaha,miryalaguda,tadipatri,kishanganj,karaikudi,suryapet,jamalpur,kavali,tadepalligudem,amaravati,buxar,jehanabad,aurangabad';
        await redisClient1.set(country, cities);
    }
})();

(async function connect() {
    await redisClient2.connect(); 
    console.log(enums.PrefixesForLogs.REDIS_CONNECTION_READY_CLIENT2 + redisClient2.isReady);
    if (redisClient2.isReady) {
        await redisClient2.subscribe(Environments.redis.channels.userCreatedProfileError, handleProfileCreateErrorMessage);
        await redisClient2.subscribe(Environments.redis.channels.userCreatedMatchError, handleMatchCreateErrorMessage);
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
