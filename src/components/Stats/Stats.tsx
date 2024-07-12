import { formatNumberWithCommas, getRandomNumber } from "../../constants/helpers";

function Stats() {
  const totalQueries = getRandomNumber(10000, 100000); // Fake data
  const weeklyTrend = getRandomNumber(0, 1000); // Fake data

  return (
    <div className="flex gap-2">
        <div className="flex-1 p-3 bg-slate-100  rounded-lg">
            <p className="text-sm mb-2">Total queries</p>
            <p className="text-2xl text-black font-semibold">{formatNumberWithCommas(totalQueries)}</p>
        </div>
        <div className="flex-1 p-3 bg-slate-100 rounded-lg">
            <p className="text-sm mb-2">Total queries</p>
            <p className="text-2xl text-black font-semibold">{weeklyTrend}%</p>
        </div>
    </div>
  )
}

export default Stats;
