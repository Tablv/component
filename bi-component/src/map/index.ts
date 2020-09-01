import china from "./china.json";
import jiangsu from "./320000.json";
import nanjing from "./320100.json";
import shandong from "./370000.json";
import heze from "./371700.json";

const JsonData = new Map();
// [
//   ["china", china],
//   ["320000", jiangsu],
//   ["320100", nanjing],
//   ["370000", shandong],
//   ["371700", heze]
// ]

JsonData.set("china", china);
JsonData.set("320000", jiangsu);
JsonData.set("320100", nanjing);
JsonData.set("370000", shandong);
JsonData.set("371700", heze);

export default {
  JsonData
};
