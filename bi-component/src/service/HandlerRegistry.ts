import { CharthandlerConstructor } from "../interfaces/ChartHandler";
import BarHandler from "./chart-handler/BarHandler";
import BarStackHandler from "./chart-handler/BarStackHandler";
import BarPercentageHandler from "./chart-handler/BarPercentageHandler";
import HBarHandler from "./chart-handler/HBarHandler";
import HBarStackHandler from "./chart-handler/HBarStackHandler";
import HBarPercentageHandler from "./chart-handler/HBarPercentageHandler";
import PieHandler from "./chart-handler/PieHandler";
import RPieHandler from "./chart-handler/RPieHandler";
import RosePieHandler from "./chart-handler/RosePieHandler";
import SunPieHandler from "./chart-handler/SunPieHandler";
import RadarHandler from "./chart-handler/RadarHandler";
import LineHandler from "./chart-handler/LineHandler";
import GuageHandler from "./chart-handler/GuageHandler";
import TargetPieHandler from "./chart-handler/TargetPieHandler";

const HANDLER_REGISTRY: { [key: string]: CharthandlerConstructor } = {
  /**
   * 柱图
   */
  bar: BarHandler,
  barStack: BarStackHandler,
  barPercentage: BarPercentageHandler,

  hbar: HBarHandler,
  hbarStack: HBarStackHandler,
  hbarPercentage: HBarPercentageHandler,

  /**
   * 饼图
   */
  pie: PieHandler,
  rpie: RPieHandler,
  rosepie: RosePieHandler,
  sunpie: SunPieHandler,
  targetpie: TargetPieHandler,

  /**
   * 雷达图
   */
  radar: RadarHandler,

  /**
   * 折线图
   */
  line: LineHandler,

  /**
   * 仪表盘图
   */
  guage: GuageHandler
};

export default HANDLER_REGISTRY;
