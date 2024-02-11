function Lawn() {
  const OneYearList = new Array(365).fill("0");

  return (
    <div>
      <div className="flex flex-col flex-wrap">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => {
          return <div key={`day_${day}`}>{day}</div>;
        })}
      </div>
    </div>
  );
}

export default Lawn;
