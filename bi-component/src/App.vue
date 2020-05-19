<template>
  <div id="app">
    <div
      class="dashboards"
      v-for="(dashboard, index) in dashboards"
      :key="dashboard.id"
    >
      <chart-component :dashboard="dashboard" :data="analysisData[index]" :ref="'chart' + dashboard.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChartComponent from "./components/ChartComponent.vue";
import Dashboard from 'glaway-bi-model/view/dashboard/Dashboard';
import ChartUIService from './interfaces/ChartUIService';

@Component({
  components: {
    ChartComponent
  }
})
export default class App extends Vue {
  dashboards: Array<Dashboard> = [
    {
    "id": "6cba940665594ede989f696582313dde",
    "visualData": {
      "grid": [10, 10],
      "width": 640,
      "position": {
        "x": 0,
        "y": 430,
        "z": 1
      },
      "type": "bar",
      "height": 290
    },
    "echarts": {
      "grid": {
        "show": false,
        "containLabel": true
      },
      "legend": {
        "orient": "horizontal",
        "data": [],
        "top": "30",
        "show": false,
        "textStyle": {
          "fontSize": 12
        },
        "right": "10%"
      },
      "series": [],
      "title": {
        "left": "center",
        "text": "人员编制分布",
        "textStyle": {
          "fontFamily": "Microsoft YaHei",
          "color": "#000",
          "fontSize": 18
        }
      },
      "sampleStyle": {
        "bar": {
          "axisLabel": {
            "rotate": 18,
            "interval": 0
          },
          "width": {
            "unit": "",
            "value": 23
          },
          "label": {
            "show": false,
            "position": "top"
          }
        },
        "global": {
          "color": ["#118DFF", "#12239E", "#E66C37", "#6B007B", "#E044A7", "#744EC2", "#D9B300", "#D64550"],
          "grid": {
            "top": {
              "unit": "",
              "value": 60
            },
            "left": {
              "unit": "",
              "value": 50
            },
            "bottom": {
              "unit": "",
              "value": 30
            },
            "right": {
              "unit": "",
              "value": 50
            }
          }
        }
      }
    },
    "staticData": {
      "json": {
        "data": "",
        "enable": false
      },
      "sql": {
        "data": "",
        "enable": false
      }
    },
    "analysis": {
      "resultStyle": {},
      "isReact": false,
      "joinRelation": [],
      "sort": {
        "data": [],
        "custom": [],
        "id": "NONE",
        "type": 0
      },
      "fromTable": {
        "schema": "xu.bidemo",
        "name": "hr",
        "alias": "G4if7K8b9c",
        "datasetId": "fe1afce26eaa4a3591a04125522b17db",
        "id": "00cd45a95f1f439ba1573669856f2df7"
      },
      "filter": {
        "data": [],
        "id": "DEFAULT"
      },
      "warn": {
        "displayType": 0,
        "color": "#FF0000",
        "id": "NONE",
        "value": []
      },
      "resultTmp": [{
        "BIANZHI": "事业",
        "ID": 34
      }, {
        "BIANZHI": "企业",
        "ID": 34
      }, {
        "BIANZHI": "返聘",
        "ID": 34
      }, {
        "BIANZHI": "劳务",
        "ID": 20
      }, {
        "BIANZHI": "其他",
        "ID": 20
      }],
      "measures": [{
        "func": ["count"],
        "alias": "ID",
        "id": "caf4dab8b11f48bd801b44f7c35ca7c8",
        "tableAlias": "G4if7K8b9c",
        "type": "y",
        "tableName": "hr",
        "columnName": "ID",
        "group": 0
      }],
      "datasetId": "fe1afce26eaa4a3591a04125522b17db",
      "where": [],
      "dimensions": [{
        "func": [],
        "alias": "BIANZHI",
        "id": "ced1201275674ac69eecd7878573cf9e",
        "tableAlias": "G4if7K8b9c",
        "type": "x",
        "tableName": "hr",
        "columnName": "BIANZHI",
        "group": 0
      }],
      "order": []
    },
    "events": {
      "triggerEvent": "",
      "triggerMethod": "",
      "eventOptions": {}
    }
  }, {
    "id": "ebbbfb9ac810417e8a422779b164e547",
    "visualData": {
      "grid": [10, 10],
      "width": 640,
      "position": {
        "x": 640,
        "y": 0,
        "z": 3
      },
      "type": "pie",
      "height": 430
    },
    "echarts": {
      "grid": {
        "show": false,
        "containLabel": true
      },
      "legend": {
        "orient": "horizontal",
        "data": [],
        "top": "30",
        "show": false,
        "textStyle": {
          "fontSize": 12
        },
        "right": "10%"
      },
      "series": [],
      "title": {
        "left": "center",
        "text": "人才素质指数",
        "textStyle": {
          "fontFamily": "Microsoft YaHei",
          "color": "#000",
          "fontSize": 18
        }
      },
      "sampleStyle": {
        "global": {
          "color": ["#8250c4", "#5ecbc8", "#438fff", "#ff977e", "#eb5757", "#5b2071", "#ec5a96", "#a43b76"],
          "grid": {
            "top": {
              "unit": "",
              "value": 60
            },
            "left": {
              "unit": "",
              "value": 50
            },
            "bottom": {
              "unit": "",
              "value": 30
            },
            "right": {
              "unit": "",
              "value": 50
            }
          }
        },
        "pie": {}
      }
    },
    "staticData": {
      "json": {
        "data": "",
        "enable": false
      },
      "sql": {
        "data": "",
        "enable": false
      }
    },
    "analysis": {
      "resultStyle": {},
      "isReact": false,
      "joinRelation": [],
      "sort": {
        "data": [],
        "custom": [],
        "id": "NONE",
        "type": 0
      },
      "fromTable": {
        "schema": "xu.bidemo",
        "name": "hr",
        "alias": "G4if7K8b9c",
        "datasetId": "fe1afce26eaa4a3591a04125522b17db",
        "id": "00cd45a95f1f439ba1573669856f2df7"
      },
      "filter": {
        "data": [],
        "id": "DEFAULT"
      },
      "warn": {
        "displayType": 0,
        "color": "#FF0000",
        "id": "NONE",
        "value": []
      },
      "resultTmp": [{
        "XUELI": "博士",
        "ID": 42
      }, {
        "XUELI": "硕士",
        "ID": 46
      }, {
        "XUELI": "本科",
        "ID": 54
      }],
      "measures": [{
        "func": ["count"],
        "alias": "ID",
        "id": "caf4dab8b11f48bd801b44f7c35ca7c8",
        "tableAlias": "G4if7K8b9c",
        "type": "y",
        "tableName": "hr",
        "columnName": "ID",
        "group": 0
      }],
      "datasetId": "fe1afce26eaa4a3591a04125522b17db",
      "where": [],
      "dimensions": [{
        "func": [],
        "alias": "XUELI",
        "id": "cc7b621f2dd04351948b3d9d01157953",
        "tableAlias": "G4if7K8b9c",
        "type": "x",
        "tableName": "hr",
        "columnName": "XUELI",
        "group": 0
      }],
      "order": []
    },
    "events": {
      "triggerEvent": "",
      "triggerMethod": "",
      "eventOptions": {}
    }
  }, {
    "id": "48d5d1f1106a441a93e98cdc0edbe982",
    "visualData": {
      "grid": [10, 10],
      "width": 640,
      "position": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "type": "rpie",
      "height": 430
    },
    "echarts": {
      "grid": {
        "show": false,
        "containLabel": true
      },
      "legend": {
        "orient": "horizontal",
        "data": [],
        "top": "30",
        "show": true,
        "textStyle": {
          "fontSize": 12
        },
        "right": "10%"
      },
      "series": [],
      "title": {
        "left": "center",
        "text": "编制分布",
        "textStyle": {
          "fontFamily": "Microsoft YaHei",
          "color": "#000",
          "fontSize": 18
        }
      },
      "sampleStyle": {
        "global": {
          "color": ["#8250c4", "#5ecbc8", "#438fff", "#ff977e", "#eb5757", "#5b2071", "#ec5a96", "#a43b76"],
          "grid": {
            "top": {
              "unit": "",
              "value": 60
            },
            "left": {
              "unit": "",
              "value": 50
            },
            "bottom": {
              "unit": "",
              "value": 30
            },
            "right": {
              "unit": "",
              "value": 50
            }
          }
        },
        "pie": {}
      }
    },
    "staticData": {
      "json": {
        "data": "",
        "enable": false
      },
      "sql": {
        "data": "",
        "enable": false
      }
    },
    "analysis": {
      "resultStyle": {},
      "isReact": false,
      "joinRelation": [],
      "sort": {
        "data": [],
        "custom": [],
        "id": "NONE",
        "type": 0
      },
      "fromTable": {
        "schema": "xu.bidemo",
        "name": "hr",
        "alias": "G4if7K8b9c",
        "datasetId": "fe1afce26eaa4a3591a04125522b17db",
        "id": "00cd45a95f1f439ba1573669856f2df7"
      },
      "filter": {
        "data": [],
        "id": "DEFAULT"
      },
      "warn": {
        "displayType": 0,
        "color": "#FF0000",
        "id": "NONE",
        "value": []
      },
      "resultTmp": [{
        "BIANZHI": "事业",
        "ID": 34
      }, {
        "BIANZHI": "企业",
        "ID": 34
      }, {
        "BIANZHI": "返聘",
        "ID": 34
      }, {
        "BIANZHI": "劳务",
        "ID": 20
      }, {
        "BIANZHI": "其他",
        "ID": 20
      }],
      "measures": [{
        "func": ["count"],
        "alias": "ID",
        "id": "caf4dab8b11f48bd801b44f7c35ca7c8",
        "tableAlias": "G4if7K8b9c",
        "type": "y",
        "tableName": "hr",
        "columnName": "ID",
        "group": 0
      }],
      "datasetId": "fe1afce26eaa4a3591a04125522b17db",
      "where": [],
      "dimensions": [{
        "func": [],
        "alias": "BIANZHI",
        "id": "ced1201275674ac69eecd7878573cf9e",
        "tableAlias": "G4if7K8b9c",
        "type": "x",
        "tableName": "hr",
        "columnName": "BIANZHI",
        "group": 0
      }],
      "order": []
    },
    "events": {
      "triggerEvent": "",
      "triggerMethod": "",
      "eventOptions": {}
    }
  }, {
    "id": "f01c4ffb94c1414096457cff165abd19",
    "visualData": {
      "grid": [10, 10],
      "width": 640,
      "position": {
        "x": 640,
        "y": 430,
        "z": 2
      },
      "type": "line",
      "height": 290
    },
    "echarts": {
      "grid": {
        "show": false,
        "containLabel": true
      },
      "legend": {
        "orient": "horizontal",
        "data": [],
        "top": "30",
        "show": false,
        "textStyle": {
          "fontSize": 12
        },
        "right": "10%"
      },
      "series": [],
      "title": {
        "left": "center",
        "text": "职称变化",
        "textStyle": {
          "fontFamily": "Microsoft YaHei",
          "color": "#000",
          "fontSize": 18
        }
      },
      "sampleStyle": {
        "line": {},
        "global": {
          "color": ["#118DFF", "#12239E", "#E66C37", "#6B007B", "#E044A7", "#744EC2", "#D9B300", "#D64550"],
          "grid": {
            "top": {
              "unit": "",
              "value": 60
            },
            "left": {
              "unit": "",
              "value": 50
            },
            "bottom": {
              "unit": "",
              "value": 30
            },
            "right": {
              "unit": "",
              "value": 50
            }
          }
        }
      }
    },
    "staticData": {
      "json": {
        "data": "",
        "enable": false
      },
      "sql": {
        "data": "",
        "enable": false
      }
    },
    "analysis": {
      "resultStyle": {},
      "isReact": false,
      "joinRelation": [],
      "sort": {
        "data": [],
        "custom": [],
        "id": "NONE",
        "type": 0
      },
      "fromTable": {
        "schema": "xu.bidemo",
        "name": "hr",
        "alias": "G4if7K8b9c",
        "datasetId": "fe1afce26eaa4a3591a04125522b17db",
        "id": "00cd45a95f1f439ba1573669856f2df7"
      },
      "filter": {
        "data": [],
        "id": "DEFAULT"
      },
      "warn": {
        "displayType": 0,
        "color": "#FF0000",
        "id": "NONE",
        "value": []
      },
      "resultTmp": [{
        "ZCDJ": "研究员",
        "ID": 54
      }, {
        "ZCDJ": "高工",
        "ID": 35
      }, {
        "ZCDJ": "技师",
        "ID": 33
      }, {
        "ZCDJ": "其他",
        "ID": 20
      }],
      "measures": [{
        "func": ["count"],
        "alias": "ID",
        "id": "caf4dab8b11f48bd801b44f7c35ca7c8",
        "tableAlias": "G4if7K8b9c",
        "type": "y",
        "tableName": "hr",
        "columnName": "ID",
        "group": 0
      }],
      "datasetId": "fe1afce26eaa4a3591a04125522b17db",
      "where": [],
      "dimensions": [{
        "func": [],
        "alias": "ZCDJ",
        "id": "a082cd2e93024a44a668e88135bf1654",
        "tableAlias": "G4if7K8b9c",
        "type": "x",
        "tableName": "hr",
        "columnName": "ZCDJ",
        "group": 0
      }],
      "order": []
    },
    "events": {
      "triggerEvent": "",
      "triggerMethod": "",
      "eventOptions": {}
    }
  }, {
    "id": "dd36053c43c54371893453afa19e89d2",
    "visualData": {
      "grid": [10, 10],
      "width": 850,
      "position": {
        "x": 0,
        "y": 10,
        "z": 0
      },
      "type": "bar",
      "height": 640
    },
    "echarts": {
      "grid": {
        "show": false,
        "containLabel": true
      },
      "legend": {
        "data": [],
        "top": "5%",
        "orient": "horizontal",
        "left": "80%",
        "show": true,
        "textStyle": {
          "fontSize": 12
        }
      },
      "series": [],
      "title": {
        "left": "left",
        "text": "各公司人员总量",
        "textStyle": {
          "fontFamily": "Microsoft YaHei",
          "color": "#000",
          "fontSize": 18
        }
      },
      "sampleStyle": {
        "bar": {
          "axisLabel": {
            "rotate": 26,
            "interval": 0
          },
          "width": {
            "unit": "",
            "value": 24
          },
          "label": {
            "show": false,
            "position": "top"
          }
        },
        "global": {
          "color": ["#118DFF", "#12239E", "#E66C37", "#6B007B", "#E044A7", "#744EC2", "#D9B300", "#D64550"],
          "grid": {
            "top": {
              "unit": "%",
              "value": 20
            },
            "left": {
              "unit": "",
              "value": 50
            },
            "bottom": {
              "unit": "",
              "value": 10
            },
            "right": {
              "unit": "",
              "value": 50
            }
          }
        }
      }
    },
    "staticData": {
      "json": {
        "data": "",
        "enable": false
      },
      "sql": {
        "data": "",
        "enable": false
      }
    },
    "analysis": {
      "resultStyle": {},
      "sort": {
        "data": [],
        "custom": [],
        "id": "default",
        "type": 0
      },
      "isReact": true,
      "joinRelation": [],
      "fromTable": {
        "schema": "localfile.excel",
        "name": "zddtest.xlsx",
        "alias": "yJ85TH5oDV",
        "datasetId": "ff308be4f0a6492aafdd75d780b7f811",
        "id": "b38d286a1e8d47f2b4d11a3f10f3eebf"
      },
      "filter": {
        "data": [],
        "id": "default"
      },
      "resultTmp": [{
        "姓名": 73,
        "公司": "十四所"
      }, {
        "姓名": 34,
        "公司": "二十三所"
      }, {
        "姓名": 16,
        "公司": "上海科明传输技术有限公司"
      }, {
        "姓名": 19,
        "公司": "国睿科技股份有限公司"
      }],
      "warn": {
        "displayType": 0,
        "color": "#FF0000",
        "id": "none",
        "value": []
      },
      "measures": [{
        "schema": "localfile.excel",
        "func": ["count"],
        "alias": "姓名",
        "tableAlias": "yJ85TH5oDV",
        "id": "d2862a27d4da4d04863ad655f14103e8",
        "tableName": "zddtest.xlsx",
        "columnName": "姓名",
        "group": 0
      }],
      "datasetId": "ff308be4f0a6492aafdd75d780b7f811",
      "where": [],
      "dimensions": [{
        "schema": "localfile.excel",
        "func": [],
        "alias": "公司",
        "tableAlias": "yJ85TH5oDV",
        "id": "6a477af31f314f5fbd1d904bdad43ca1",
        "tableName": "zddtest.xlsx",
        "columnName": "公司",
        "group": 0
      }],
      "order": []
    },
    "events": {
      "triggerEvent": "react",
      "triggerMethod": "click",
      "eventOptions": {}
    }
  }, {
    "id": "2c2f6ed799b44422ba6588ecc200acee",
    "visualData": {
      "grid": [10, 10],
      "width": 940,
      "position": {
        "x": 850,
        "y": 10,
        "z": 1
      },
      "type": "bar",
      "height": 640
    },
    "echarts": {
      "grid": {
        "show": false,
        "containLabel": true
      },
      "legend": {
        "data": [],
        "top": "5%",
        "orient": "horizontal",
        "left": "80%",
        "show": true,
        "textStyle": {
          "fontSize": 12
        }
      },
      "series": [],
      "title": {
        "left": "left",
        "text": "图表",
        "textStyle": {
          "fontFamily": "Microsoft YaHei",
          "color": "#000",
          "fontSize": 18
        }
      },
      "sampleStyle": {
        "bar": {
          "axisLabel": {
            "rotate": 0,
            "interval": 0
          },
          "width": {
            "unit": "",
            "value": 13
          },
          "label": {
            "show": false,
            "position": "top"
          }
        },
        "global": {
          "color": ["#118DFF", "#12239E", "#E66C37", "#6B007B", "#E044A7", "#744EC2", "#D9B300", "#D64550"],
          "grid": {
            "top": {
              "unit": "",
              "value": 50
            },
            "left": {
              "unit": "",
              "value": 50
            },
            "bottom": {
              "unit": "",
              "value": 50
            },
            "right": {
              "unit": "",
              "value": 50
            }
          }
        }
      }
    },
    "staticData": {
      "json": {
        "data": "",
        "enable": false
      },
      "sql": {
        "data": "",
        "enable": false
      }
    },
    "analysis": {
      "resultStyle": {},
      "sort": {
        "data": [],
        "custom": [],
        "id": "default",
        "type": 0
      },
      "isReact": true,
      "joinRelation": [],
      "fromTable": {
        "schema": "localfile.excel",
        "name": "zddtest.xlsx",
        "alias": "yJ85TH5oDV",
        "datasetId": "ff308be4f0a6492aafdd75d780b7f811",
        "id": "b38d286a1e8d47f2b4d11a3f10f3eebf"
      },
      "filter": {
        "data": [],
        "id": "default"
      },
      "resultTmp": [{
        "姓名": 26,
        "部门": "国际合作部"
      }, {
        "姓名": 24,
        "部门": "人力资源部"
      }, {
        "姓名": 21,
        "部门": "技术基础部"
      }, {
        "姓名": 18,
        "部门": "综合办公室"
      }, {
        "姓名": 17,
        "部门": "标准化室"
      }, {
        "姓名": 10,
        "部门": "档案室"
      }, {
        "姓名": 16,
        "部门": "信息化推进中心"
      }, {
        "姓名": 10,
        "部门": "二部"
      }],
      "warn": {
        "displayType": 0,
        "color": "#FF0000",
        "id": "none",
        "value": []
      },
      "measures": [{
        "schema": "localfile.excel",
        "func": ["count"],
        "alias": "姓名",
        "tableAlias": "yJ85TH5oDV",
        "id": "d2862a27d4da4d04863ad655f14103e8",
        "tableName": "zddtest.xlsx",
        "columnName": "姓名",
        "group": 0
      }],
      "datasetId": "ff308be4f0a6492aafdd75d780b7f811",
      "where": [],
      "dimensions": [{
        "schema": "localfile.excel",
        "func": [],
        "alias": "部门",
        "tableAlias": "yJ85TH5oDV",
        "id": "1f5d5805b5b4459e8274d78d3bc44fa1",
        "tableName": "zddtest.xlsx",
        "columnName": "部门",
        "group": 0
      }],
      "order": []
    },
    "events": {
      "triggerEvent": "",
      "triggerMethod": "",
      "eventOptions": {}
    }
  }] as any;

  get analysisData() {
    return this.dashboards.map(dashboard => {
      return dashboard.analysis.resultTmp;
    });
  }

  mounted() {
    this.dashboards.forEach(dashboard => {
      const chart = (this.$refs['chart' + dashboard.id] as any)[0] as ChartUIService;
      chart.initChart();
      chart.renderChart();
    })
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
