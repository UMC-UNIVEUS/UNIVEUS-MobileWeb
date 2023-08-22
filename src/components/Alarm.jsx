import '../components/Alarm.scss';

const Alarm = ({ alarmtext }) => {
    return (
        <div className="Alarm">
            <p className='alarmtext'>{alarmtext}</p>
        </div>
    );
};

export default Alarm;