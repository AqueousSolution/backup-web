

const MetricCard = ({number,name,icon}) => {
    return ( 
        <div className="metric-card">
            <img src={icon} alt="metric icon" className="metric-card__icon" />
            <div>
                <h2 className="metric-card__number">{number}</h2>
                <p className="metric-card__name">{name}</p>
            </div>
        </div>
     );
}
 
export default MetricCard;