// Territory mapping for XIVAPI map backgrounds
const territoryMapping = {
    "Coerthas Western Highlands": { territory: "r2f1", index: "00" },
    "The Sea of Clouds": { territory: "a2f1", index: "00" },
    "The Dravanian Forelands": { territory: "d2f1", index: "00" },
    "The Churning Mists": { territory: "d2f3", index: "00" },
    "The Dravanian Hinterlands": { territory: "d2f2", index: "00" },
    "The Peaks": { territory: "g3f2", index: "00" },
    "The Fringes": { territory: "g3f1", index: "00" },
    "The Ruby Sea": { territory: "e3f1", index: "00" },
    "Yanxia": { territory: "e3f2", index: "00" },
    "The Azim Steppe": { territory: "e3f3", index: "00" },
    "The Lochs": { territory: "g3f3", index: "00" },
    "Tempest": { territory: "n4f6", index: "00" },
    "Kholusia": { territory: "n4f2", index: "00" },
    "Amh Araeng": { territory: "n4f3", index: "00" },
    "Lakeland": { territory: "n4f1", index: "00" },
    "Il Mheg": { territory: "n4f4", index: "00" },
    "Rak'tika": { territory: "n4f5", index: "00" },
    "Thavnair": { territory: "m5f1", index: "00" },
    "Labyrinthos": { territory: "k5f1", index: "00" },
    "Garlemald": { territory: "m5f2", index: "00" },
    "Mare Lamentorum": { territory: "u5f1", index: "00" },
    "Elpis": { territory: "n5f1", index: "00" },
    "Ultima Thule": { territory: "u5f2", index: "00" },
    "Kozama'uka": { territory: "y6f2", index: "00" },
    "Urqopacha": { territory: "y6f1", index: "00" },
    "Yak T'el": { territory: "y6f3", index: "00" },
    "Shaaloani": { territory: "x6f1", index: "00" },
    "Heritage Found": { territory: "x6f2", index: "00" },
    "Living Memory": { territory: "x6f3", index: "00" }
};

// Aether Currents and Aetherytes data extracted from JSON files
const aetherData = {
    "Coerthas Western Highlands": {
        "currents": [
            {
                "x": 402.0,
                "y": 561.4,
                "z": 191.5,
                "dataId": 2005536,
                "aetherCurrentId": 2818053,
                "territoryId": 397,
                "name": "Aether Current 1"
            },
            {
                "x": 424.9,
                "y": -536.9,
                "z": 164.3,
                "dataId": 2006187,
                "aetherCurrentId": 2818055,
                "territoryId": 397,
                "name": "Aether Current 2"
            },
            {
                "x": -332.9,
                "y": -30.0,
                "z": 126.8,
                "dataId": 2006189,
                "aetherCurrentId": 2818057,
                "territoryId": 397,
                "name": "Aether Current 3"
            },
            {
                "x": -660.2,
                "y": -376.6,
                "z": 135.5,
                "dataId": 2006190,
                "aetherCurrentId": 2818058,
                "territoryId": 397,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 474.87585,
                "y": 708.5221,
                "z": 217.94458,
                "name": "Falcons Nest"
            }
        ]
    },
    "The Sea of Clouds": {
        "currents": [
            {
                "x": -747.1,
                "y": 163.8,
                "z": -57.1,
                "dataId": 2006228,
                "aetherCurrentId": 2818116,
                "territoryId": 401,
                "name": "Aether Current 1"
            },
            {
                "x": -759.4,
                "y": -110.9,
                "z": -9.2,
                "dataId": 2006229,
                "aetherCurrentId": 2818117,
                "territoryId": 401,
                "name": "Aether Current 2"
            },
            {
                "x": -564.8,
                "y": -349.1,
                "z": -36.7,
                "dataId": 2006234,
                "aetherCurrentId": 2818122,
                "territoryId": 401,
                "name": "Aether Current 3"
            },
            {
                "x": -180.3,
                "y": -543.1,
                "z": -14.9,
                "dataId": 2006231,
                "aetherCurrentId": 2818119,
                "territoryId": 401,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": -615.7473,
                "y": 546.5934,
                "z": -118.36426,
                "name": "Camp Cloudtop"
            },
            {
                "x": -613.1533,
                "y": -415.03015,
                "z": -49.485046,
                "name": "Ok Zundu"
            }
        ]
    },
    "The Dravanian Forelands": {
        "currents": [
            {
                "x": 765.0,
                "y": 289.1,
                "z": -15.9,
                "dataId": 2006195,
                "aetherCurrentId": 2818068,
                "territoryId": 398,
                "name": "Aether Current 1"
            },
            {
                "x": 433.5,
                "y": -286.2,
                "z": -47.8,
                "dataId": 2006197,
                "aetherCurrentId": 2818070,
                "territoryId": 398,
                "name": "Aether Current 2"
            },
            {
                "x": 406.8,
                "y": 686.6,
                "z": -89.8,
                "dataId": 2006204,
                "aetherCurrentId": 2818077,
                "territoryId": 398,
                "name": "Aether Current 3"
            },
            {
                "x": -480.3,
                "y": -425.3,
                "z": -6.0,
                "dataId": 2006201,
                "aetherCurrentId": 2818074,
                "territoryId": 398,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 532.6771,
                "y": 30.166992,
                "z": -48.722107,
                "name": "Tailfeather"
            },
            {
                "x": -304.12756,
                "y": 32.059082,
                "z": -16.70868,
                "name": "Anyx Trine"
            }
        ]
    },
    "The Churning Mists": {
        "currents": [
            {
                "x": 421.2,
                "y": 661.8,
                "z": -43.1,
                "dataId": 2006216,
                "aetherCurrentId": 2818099,
                "territoryId": 400,
                "name": "Aether Current 1"
            },
            {
                "x": -93.8,
                "y": 223.8,
                "z": -6.8,
                "dataId": 2006217,
                "aetherCurrentId": 2818100,
                "territoryId": 400,
                "name": "Aether Current 2"
            },
            {
                "x": -775.3,
                "y": 243.7,
                "z": 123.7,
                "dataId": 2006218,
                "aetherCurrentId": 2818101,
                "territoryId": 400,
                "name": "Aether Current 3"
            },
            {
                "x": 340.0,
                "y": -130.5,
                "z": -25.4,
                "dataId": 2006224,
                "aetherCurrentId": 2818107,
                "territoryId": 400,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 259.20496,
                "y": 596.85657,
                "z": -37.70508,
                "name": "Moghome"
            },
            {
                "x": -584.9546,
                "y": 313.43542,
                "z": 52.84192,
                "name": "Zenith"
            }
        ]
    },
    "The Dravanian Hinterlands": {
        "currents": [
            {
                "x": 729.2,
                "y": 150.9,
                "z": 134.9,
                "dataId": 2006205,
                "aetherCurrentId": 2818083,
                "territoryId": 399,
                "name": "Aether Current 1"
            },
            {
                "x": 98.9,
                "y": -174.4,
                "z": 73.1,
                "dataId": 2006208,
                "aetherCurrentId": 2818086,
                "territoryId": 399,
                "name": "Aether Current 2"
            },
            {
                "x": -452.4,
                "y": 678.2,
                "z": 138.1,
                "dataId": 2006214,
                "aetherCurrentId": 2818092,
                "territoryId": 399,
                "name": "Aether Current 3"
            },
            {
                "x": -487.5,
                "y": -285.4,
                "z": 144.6,
                "dataId": 2006210,
                "aetherCurrentId": 2818088,
                "territoryId": 399,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 71.94617,
                "y": -18.905945,
                "z": 211.26111,
                "name": "Idyllshire"
            }
        ]
    },
    "The Peaks": {
        "currents": [
            {
                "x": -485.2,
                "y": 247.4,
                "z": 304.5,
                "dataId": 2007981,
                "aetherCurrentId": 2818154,
                "territoryId": 620,
                "name": "Aether Current 1"
            },
            {
                "x": 146.6,
                "y": 460.8,
                "z": 303.7,
                "dataId": 2007984,
                "aetherCurrentId": 2818157,
                "territoryId": 620,
                "name": "Aether Current 2"
            },
            {
                "x": 202.9,
                "y": -753.1,
                "z": 133.9,
                "dataId": 2007976,
                "aetherCurrentId": 2818149,
                "territoryId": 620,
                "name": "Aether Current 3"
            },
            {
                "x": -271.3,
                "y": -280.3,
                "z": 157.9,
                "dataId": 2007978,
                "aetherCurrentId": 2818151,
                "territoryId": 620,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 114.579956,
                "y": -747.06647,
                "z": 120.10376,
                "name": "Ala Gannha"
            },
            {
                "x": -271.3817,
                "y": 748.86694,
                "z": 259.87634,
                "name": "Ala Ghiri"
            }
        ]
    },
    "The Fringes": {
        "currents": [
            {
                "x": 202.9,
                "y": -753.1,
                "z": 133.9,
                "dataId": 2007976,
                "aetherCurrentId": 2818149,
                "territoryId": 620,
                "name": "Aether Current 1"
            },
            {
                "x": -271.3,
                "y": -280.3,
                "z": 157.9,
                "dataId": 2007978,
                "aetherCurrentId": 2818151,
                "territoryId": 620,
                "name": "Aether Current 2"
            },
            {
                "x": 322.6,
                "y": 10.5,
                "z": 89.0,
                "dataId": 2007971,
                "aetherCurrentId": 2818139,
                "territoryId": 612,
                "name": "Aether Current 3"
            },
            {
                "x": 743.0,
                "y": -214.1,
                "z": 181.0,
                "dataId": 2007972,
                "aetherCurrentId": 2818140,
                "territoryId": 612,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": -629.11426,
                "y": -509.14783,
                "z": 132.89075,
                "name": "Castrum Oriens"
            },
            {
                "x": 415.3047,
                "y": 246.75354,
                "z": 117.357056,
                "name": "Peering Stones"
            }
        ]
    },
    "The Ruby Sea": {
        "currents": [
            {
                "x": 423.5,
                "y": 801.5,
                "z": 15.8,
                "dataId": 2007995,
                "aetherCurrentId": 2818178,
                "territoryId": 613,
                "name": "Aether Current 1"
            },
            {
                "x": 21.3,
                "y": -623.6,
                "z": 24.0,
                "dataId": 2007999,
                "aetherCurrentId": 2818182,
                "territoryId": 613,
                "name": "Aether Current 2"
            },
            {
                "x": 694.8,
                "y": -53.5,
                "z": 1.9,
                "dataId": 2008002,
                "aetherCurrentId": 2818185,
                "territoryId": 613,
                "name": "Aether Current 3"
            },
            {
                "x": -805.8,
                "y": 235.2,
                "z": 36.6,
                "dataId": 2008004,
                "aetherCurrentId": 2818187,
                "territoryId": 613,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 358.72437,
                "y": -263.4165,
                "z": -118.05908,
                "name": "Tamamizu"
            },
            {
                "x": 88.181885,
                "y": -583.3677,
                "z": 4.135132,
                "name": "Onokoro"
            }
        ]
    },
    "Yanxia": {
        "currents": [
            {
                "x": 163.6,
                "y": -11.9,
                "z": 144.6,
                "dataId": 2008008,
                "aetherCurrentId": 2818196,
                "territoryId": 614,
                "name": "Aether Current 1"
            },
            {
                "x": 457.5,
                "y": 822.4,
                "z": 32.4,
                "dataId": 2008011,
                "aetherCurrentId": 2818199,
                "territoryId": 614,
                "name": "Aether Current 2"
            },
            {
                "x": 497.3,
                "y": 402.5,
                "z": 16.3,
                "dataId": 2008007,
                "aetherCurrentId": 2818195,
                "territoryId": 614,
                "name": "Aether Current 3"
            },
            {
                "x": -97.4,
                "y": 563.7,
                "z": 13.3,
                "dataId": 2008013,
                "aetherCurrentId": 2818201,
                "territoryId": 614,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 432.66956,
                "y": -90.74542,
                "z": 73.07532,
                "name": "Namai"
            },
            {
                "x": 246.02112,
                "y": -401.3581,
                "z": 9.079041,
                "name": "House The Fierce"
            }
        ]
    },
    "The Azim Steppe": {
        "currents": [
            {
                "x": 232.0,
                "y": -515.8,
                "z": 93.4,
                "dataId": 2008017,
                "aetherCurrentId": 2818210,
                "territoryId": 622,
                "name": "Aether Current 1"
            },
            {
                "x": 105.6,
                "y": -49.7,
                "z": 116.0,
                "dataId": 2008019,
                "aetherCurrentId": 2818212,
                "territoryId": 622,
                "name": "Aether Current 2"
            },
            {
                "x": -693.8,
                "y": 658.9,
                "z": 7.3,
                "dataId": 2008022,
                "aetherCurrentId": 2818215,
                "territoryId": 622,
                "name": "Aether Current 3"
            },
            {
                "x": 570.3,
                "y": 438.2,
                "z": -19.5,
                "dataId": 2008015,
                "aetherCurrentId": 2818208,
                "territoryId": 622,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 556.1454,
                "y": 340.10828,
                "z": -16.800232,
                "name": "Reunion"
            },
            {
                "x": 78.26355,
                "y": 36.301147,
                "z": 119.37134,
                "name": "Dawn Throne"
            },
            {
                "x": -754.63495,
                "y": 116.5636,
                "z": 131.2428,
                "name": "Dhoro Iloh"
            }
        ]
    },
    "The Lochs": {
        "currents": [
            {
                "x": 109.6,
                "y": 788.6,
                "z": 42.0,
                "dataId": 2007992,
                "aetherCurrentId": 2818170,
                "territoryId": 621,
                "name": "Aether Current 1"
            },
            {
                "x": 683.4,
                "y": 521.2,
                "z": 70.0,
                "dataId": 2007994,
                "aetherCurrentId": 2818172,
                "territoryId": 621,
                "name": "Aether Current 2"
            },
            {
                "x": 261.5,
                "y": 69.9,
                "z": 78.4,
                "dataId": 2007993,
                "aetherCurrentId": 2818171,
                "territoryId": 621,
                "name": "Aether Current 3"
            },
            {
                "x": -380.2,
                "y": 16.9,
                "z": 10.1,
                "dataId": 2007987,
                "aetherCurrentId": 2818165,
                "territoryId": 621,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": -652.0333,
                "y": -16.006714,
                "z": 53.391357,
                "name": "Porta Praetoria"
            },
            {
                "x": 612.4512,
                "y": 656.82446,
                "z": 84.45862,
                "name": "Ala Mhigan Quarter"
            }
        ]
    },
    "Tempest": {
        "currents": [
            {
                "x": 358.2,
                "y": -715.9,
                "z": 396.5,
                "dataId": 2010074,
                "aetherCurrentId": 2818298,
                "territoryId": 818,
                "name": "Aether Current 1"
            },
            {
                "x": 50.2,
                "y": -512.1,
                "z": 380.1,
                "dataId": 2010076,
                "aetherCurrentId": 2818300,
                "territoryId": 818,
                "name": "Aether Current 2"
            },
            {
                "x": 339.1,
                "y": -280.0,
                "z": 298.7,
                "dataId": 2010079,
                "aetherCurrentId": 2818303,
                "territoryId": 818,
                "name": "Aether Current 3"
            },
            {
                "x": -774.3,
                "y": -97.7,
                "z": 63.2,
                "dataId": 2010083,
                "aetherCurrentId": 2818307,
                "territoryId": 818,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 561.76074,
                "y": -199.17603,
                "z": 352.62073,
                "name": "Ondo Cups"
            },
            {
                "x": -141.74109,
                "y": 218.00562,
                "z": -280.5371,
                "name": "Macarenses Angle"
            }
        ]
    },
    "Kholusia": {
        "currents": [
            {
                "x": 650.5,
                "y": 556.4,
                "z": 0.4,
                "dataId": 2010034,
                "aetherCurrentId": 2818238,
                "territoryId": 814,
                "name": "Aether Current 1"
            },
            {
                "x": -651.2,
                "y": 588.4,
                "z": -0.0,
                "dataId": 2010038,
                "aetherCurrentId": 2818242,
                "territoryId": 814,
                "name": "Aether Current 2"
            },
            {
                "x": 623.7,
                "y": -555.3,
                "z": 285.9,
                "dataId": 2010041,
                "aetherCurrentId": 2818245,
                "territoryId": 814,
                "name": "Aether Current 3"
            },
            {
                "x": -62.9,
                "y": -16.6,
                "z": 345.1,
                "dataId": 2010042,
                "aetherCurrentId": 2818246,
                "territoryId": 814,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 668.32983,
                "y": 289.17358,
                "z": 29.465088,
                "name": "Stilltide"
            },
            {
                "x": -244.00702,
                "y": 385.45813,
                "z": 20.736938,
                "name": "Wright"
            },
            {
                "x": -426.38287,
                "y": -623.5294,
                "z": 419.27222,
                "name": "Tomra"
            }
        ]
    },
    "Amh Araeng": {
        "currents": [
            {
                "x": 446.1,
                "y": -523.7,
                "z": -60.6,
                "dataId": 2010044,
                "aetherCurrentId": 2818253,
                "territoryId": 815,
                "name": "Aether Current 1"
            },
            {
                "x": 344.7,
                "y": 538.9,
                "z": -66.5,
                "dataId": 2010047,
                "aetherCurrentId": 2818256,
                "territoryId": 815,
                "name": "Aether Current 2"
            },
            {
                "x": -343.8,
                "y": -235.4,
                "z": 47.0,
                "dataId": 2010050,
                "aetherCurrentId": 2818259,
                "territoryId": 815,
                "name": "Aether Current 3"
            },
            {
                "x": 158.8,
                "y": 674.9,
                "z": -61.1,
                "dataId": 2010052,
                "aetherCurrentId": 2818261,
                "territoryId": 815,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 246.38745,
                "y": -220.29456,
                "z": 12.985352,
                "name": "Mord Souq"
            },
            {
                "x": 399.0996,
                "y": 307.97278,
                "z": -24.521301,
                "name": "Inn Journeys Head"
            },
            {
                "x": -511.3451,
                "y": -212.604,
                "z": 47.989624,
                "name": "Twine"
            }
        ]
    },
    "Lakeland": {
        "currents": [
            {
                "x": 554.3,
                "y": 352.1,
                "z": 17.9,
                "dataId": 2010024,
                "aetherCurrentId": 2818223,
                "territoryId": 813,
                "name": "Aether Current 1"
            },
            {
                "x": 613.2,
                "y": -231.2,
                "z": 24.0,
                "dataId": 2010028,
                "aetherCurrentId": 2818227,
                "territoryId": 813,
                "name": "Aether Current 2"
            },
            {
                "x": -619.7,
                "y": -199.1,
                "z": 51.5,
                "dataId": 2010032,
                "aetherCurrentId": 2818231,
                "territoryId": 813,
                "name": "Aether Current 3"
            },
            {
                "x": -149.8,
                "y": -102.5,
                "z": 15.3,
                "dataId": 2010031,
                "aetherCurrentId": 2818230,
                "territoryId": 813,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 753.7803,
                "y": -28.82434,
                "z": 24.338135,
                "name": "Fort Jobb"
            },
            {
                "x": -735.01184,
                "y": -230.02979,
                "z": 53.391357,
                "name": "Ostall Imperative"
            }
        ]
    },
    "Il Mheg": {
        "currents": [
            {
                "x": -231.4,
                "y": 160.8,
                "z": 4.7,
                "dataId": 2010056,
                "aetherCurrentId": 2818270,
                "territoryId": 816,
                "name": "Aether Current 1"
            },
            {
                "x": 12.8,
                "y": -851.3,
                "z": 110.7,
                "dataId": 2010059,
                "aetherCurrentId": 2818273,
                "territoryId": 816,
                "name": "Aether Current 2"
            },
            {
                "x": 432.5,
                "y": -770.4,
                "z": 90.4,
                "dataId": 2010062,
                "aetherCurrentId": 2818276,
                "territoryId": 816,
                "name": "Aether Current 3"
            },
            {
                "x": -9.0,
                "y": -247.7,
                "z": 89.3,
                "dataId": 2010063,
                "aetherCurrentId": 2818277,
                "territoryId": 816,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": -344.71655,
                "y": 512.2606,
                "z": 48.722046,
                "name": "Lydha Lran"
            },
            {
                "x": -72.55664,
                "y": -857.35864,
                "z": 103.95972,
                "name": "Pla Enni"
            },
            {
                "x": 380.51416,
                "y": -687.2511,
                "z": 87.20532,
                "name": "Wolekdorf"
            }
        ]
    },
    "Rak'tika": {
        "currents": [
            {
                "x": -406.0,
                "y": 506.5,
                "z": 7.2,
                "dataId": 2010064,
                "aetherCurrentId": 2818283,
                "territoryId": 817,
                "name": "Aether Current 1"
            },
            {
                "x": -141.6,
                "y": 49.8,
                "z": -0.9,
                "dataId": 2010066,
                "aetherCurrentId": 2818285,
                "territoryId": 817,
                "name": "Aether Current 2"
            },
            {
                "x": 338.6,
                "y": 203.2,
                "z": 24.1,
                "dataId": 2010069,
                "aetherCurrentId": 2818288,
                "territoryId": 817,
                "name": "Aether Current 3"
            },
            {
                "x": 681.1,
                "y": -262.8,
                "z": -39.2,
                "dataId": 2010073,
                "aetherCurrentId": 2818292,
                "territoryId": 817,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": -103.4104,
                "y": 297.23047,
                "z": -19.333252,
                "name": "Slitherbough"
            },
            {
                "x": 382.77246,
                "y": -194.11005,
                "z": 21.042175,
                "name": "Fanow"
            }
        ]
    },
    "Thavnair": {
        "currents": [
            {
                "x": -176.1,
                "y": 537.8,
                "z": 21.5,
                "dataId": 2011990,
                "aetherCurrentId": 2818329,
                "territoryId": 957,
                "name": "Aether Current 1"
            },
            {
                "x": -49.3,
                "y": -710.8,
                "z": 94.1,
                "dataId": 2011991,
                "aetherCurrentId": 2818330,
                "territoryId": 957,
                "name": "Aether Current 2"
            },
            {
                "x": 118.5,
                "y": -343.9,
                "z": 4.9,
                "dataId": 2011995,
                "aetherCurrentId": 2818331,
                "territoryId": 957,
                "name": "Aether Current 3"
            },
            {
                "x": 550.0,
                "y": -159.1,
                "z": 25.5,
                "dataId": 2011996,
                "aetherCurrentId": 2818332,
                "territoryId": 957,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 193.49963,
                "y": 629.2362,
                "z": 6.9733276,
                "name": "Yedlihmad"
            },
            {
                "x": -527.48914,
                "y": 36.75891,
                "z": 4.776001,
                "name": "Great Work"
            },
            {
                "x": 405.1422,
                "y": -244.4953,
                "z": 5.2643433,
                "name": "Palakas Stand"
            }
        ]
    },
    "Labyrinthos": {
        "currents": [
            {
                "x": 346.5,
                "y": -767.8,
                "z": 209.3,
                "dataId": 2011980,
                "aetherCurrentId": 2818314,
                "territoryId": 956,
                "name": "Aether Current 1"
            },
            {
                "x": 748.5,
                "y": 66.8,
                "z": 106.7,
                "dataId": 2011981,
                "aetherCurrentId": 2818315,
                "territoryId": 956,
                "name": "Aether Current 2"
            },
            {
                "x": -547.8,
                "y": 661.9,
                "z": -18.1,
                "dataId": 2011985,
                "aetherCurrentId": 2818316,
                "territoryId": 956,
                "name": "Aether Current 3"
            },
            {
                "x": -128.1,
                "y": 676.7,
                "z": -20.5,
                "dataId": 2011986,
                "aetherCurrentId": 2818317,
                "territoryId": 956,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 443.5338,
                "y": -476.18835,
                "z": 170.6416,
                "name": "Archeion"
            },
            {
                "x": 8.377136,
                "y": -46.67737,
                "z": -27.542603,
                "name": "Sharlayan Hamlet"
            },
            {
                "x": -729.18286,
                "y": 302.1438,
                "z": -27.634155,
                "name": "Aporia"
            }
        ]
    },
    "Garlemald": {
        "currents": [
            {
                "x": -184.2,
                "y": 423.6,
                "z": 31.9,
                "dataId": 2012000,
                "aetherCurrentId": 2818344,
                "territoryId": 958,
                "name": "Aether Current 1"
            },
            {
                "x": 194.8,
                "y": 644.3,
                "z": -12.9,
                "dataId": 2012001,
                "aetherCurrentId": 2818345,
                "territoryId": 958,
                "name": "Aether Current 2"
            },
            {
                "x": 382.2,
                "y": -482.2,
                "z": 25.9,
                "dataId": 2012005,
                "aetherCurrentId": 2818349,
                "territoryId": 958,
                "name": "Aether Current 3"
            },
            {
                "x": -602.0,
                "y": -325.9,
                "z": 34.3,
                "dataId": 2012006,
                "aetherCurrentId": 2818350,
                "territoryId": 958,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": -408.10254,
                "y": 479.9724,
                "z": 24.15503,
                "name": "Camp Broken Glass"
            },
            {
                "x": 518.9136,
                "y": -178.36273,
                "z": -35.324707,
                "name": "Tertium"
            }
        ]
    },
    "Mare Lamentorum": {
        "currents": [
            {
                "x": 29.1,
                "y": -550.4,
                "z": -47.7,
                "dataId": 2012013,
                "aetherCurrentId": 2818362,
                "territoryId": 959,
                "name": "Aether Current 1"
            },
            {
                "x": -482.7,
                "y": -595.7,
                "z": -155.0,
                "dataId": 2012011,
                "aetherCurrentId": 2818360,
                "territoryId": 959,
                "name": "Aether Current 2"
            },
            {
                "x": 42.6,
                "y": -167.0,
                "z": 124.0,
                "dataId": 2012010,
                "aetherCurrentId": 2818359,
                "territoryId": 959,
                "name": "Aether Current 3"
            },
            {
                "x": 316.4,
                "y": -595.5,
                "z": -155.0,
                "dataId": 2012012,
                "aetherCurrentId": 2818361,
                "territoryId": 959,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": -566.2471,
                "y": 650.6294,
                "z": 134.66089,
                "name": "Sinus Lacrimarum"
            },
            {
                "x": -0.015319824,
                "y": -512.0165,
                "z": -128.83197,
                "name": "Bestways Burrow"
            }
        ]
    },
    "Elpis": {
        "currents": [
            {
                "x": 628.2,
                "y": 107.9,
                "z": 8.3,
                "dataId": 2012020,
                "aetherCurrentId": 2818374,
                "territoryId": 961,
                "name": "Aether Current 1"
            },
            {
                "x": -754.8,
                "y": 411.1,
                "z": -36.0,
                "dataId": 2012021,
                "aetherCurrentId": 2818375,
                "territoryId": 961,
                "name": "Aether Current 2"
            },
            {
                "x": -555.6,
                "y": 172.4,
                "z": 158.1,
                "dataId": 2012026,
                "aetherCurrentId": 2818380,
                "territoryId": 961,
                "name": "Aether Current 3"
            },
            {
                "x": -402.9,
                "y": -691.3,
                "z": 327.7,
                "dataId": 2012025,
                "aetherCurrentId": 2818379,
                "territoryId": 961,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": 159.96033,
                "y": 126.878784,
                "z": 11.703674,
                "name": "Anagnorisis"
            },
            {
                "x": -633.7225,
                "y": 542.56494,
                "z": -19.821533,
                "name": "Twelve Wonders"
            },
            {
                "x": -529.9001,
                "y": -222.2782,
                "z": 161.24207,
                "name": "Poieten Oikos"
            }
        ]
    },
    "Ultima Thule": {
        "currents": [
            {
                "x": -333.5,
                "y": -361.5,
                "z": 270.8,
                "dataId": 2012030,
                "aetherCurrentId": 2818389,
                "territoryId": 960,
                "name": "Aether Current 1"
            },
            {
                "x": 13.1,
                "y": -756.4,
                "z": 275.6,
                "dataId": 2012031,
                "aetherCurrentId": 2818390,
                "territoryId": 960,
                "name": "Aether Current 2"
            },
            {
                "x": 539.3,
                "y": 239.4,
                "z": 438.0,
                "dataId": 2012033,
                "aetherCurrentId": 2818392,
                "territoryId": 960,
                "name": "Aether Current 3"
            },
            {
                "x": 661.8,
                "y": 411.7,
                "z": 440.0,
                "dataId": 2012032,
                "aetherCurrentId": 2818391,
                "territoryId": 960,
                "name": "Aether Current 4"
            }
        ],
        "aetherytes": [
            {
                "x": -544.152,
                "y": 269.6421,
                "z": 74.32666,
                "name": "Reah Tahra"
            },
            {
                "x": 64.286255,
                "y": -657.49603,
                "z": 272.48022,
                "name": "Abode The Ea"
            },
            {
                "x": 489.2804,
                "y": 333.63843,
                "z": 437.5829,
                "name": "Base Omicron"
            }
        ]
    },
    "Kozama'uka": {
        "currents": [
            {
                "x": -754.1,
                "y": 122.7,
                "z": 138.7,
                "dataId": 2013941,
                "aetherCurrentId": 2818426,
                "territoryId": 1188,
                "name": "Aether Current 1"
            },
            {
                "x": 485.9,
                "y": 831.3,
                "z": 121.4,
                "dataId": 2013943,
                "aetherCurrentId": 2818428,
                "territoryId": 1188,
                "name": "Aether Current 2"
            },
            {
                "x": 49.0,
                "y": 287.2,
                "z": 111.3,
                "dataId": 2013940,
                "aetherCurrentId": 2818422,
                "territoryId": 1188,
                "name": "Aether Current 3"
            },
            {
                "x": 299.5,
                "y": -688.4,
                "z": 1.4,
                "dataId": 2013934,
                "aetherCurrentId": 2818419,
                "territoryId": 1188,
                "name": "Aether Current 4"
            },
            {
                "x": -599.6,
                "y": -179.5,
                "z": 5.1,
                "dataId": 2013935,
                "aetherCurrentId": 2818420,
                "territoryId": 1188,
                "name": "Aether Current 5"
            },
            {
                "x": -638.1,
                "y": -486.5,
                "z": 6.5,
                "dataId": 2013936,
                "aetherCurrentId": 2818423,
                "territoryId": 1188,
                "name": "Aether Current 6"
            },
            {
                "x": -294.2,
                "y": 640.0,
                "z": 110.7,
                "dataId": 2013939,
                "aetherCurrentId": 2818421,
                "territoryId": 1188,
                "name": "Aether Current 7"
            },
            {
                "x": 516.8,
                "y": -348.0,
                "z": 18.0,
                "dataId": 2013938,
                "aetherCurrentId": 2818425,
                "territoryId": 1188,
                "name": "Aether Current 8"
            },
            {
                "x": 918.2,
                "y": -404.1,
                "z": 10.1,
                "dataId": 2013937,
                "aetherCurrentId": 2818424,
                "territoryId": 1188,
                "name": "Aether Current 9"
            },
            {
                "x": 130.4,
                "y": 522.9,
                "z": 115.2,
                "dataId": 2013942,
                "aetherCurrentId": 2818427,
                "territoryId": 1188,
                "name": "Aether Current 10"
            }
        ],
        "aetherytes": [
            {
                "x": -169.51251,
                "y": -479.42322,
                "z": 6.576599,
                "name": "Ok Hanu"
            },
            {
                "x": 541.16125,
                "y": 203.60107,
                "z": 117.41809,
                "name": "Many Fires"
            },
            {
                "x": -477.53113,
                "y": 311.32983,
                "z": 124.04053,
                "name": "Earthenshire"
            },
            {
                "x": 787.59436,
                "y": -236.22491,
                "z": 14.175598,
                "name": "Dock Poga"
            }
        ]
    },
    "Urqopacha": {
        "currents": [
            {
                "x": 398.8,
                "y": 261.4,
                "z": 86.0,
                "dataId": 2013933,
                "aetherCurrentId": 2818413,
                "territoryId": 1187,
                "name": "Aether Current 1"
            },
            {
                "x": 368.3,
                "y": -9.2,
                "z": 61.1,
                "dataId": 2013932,
                "aetherCurrentId": 2818412,
                "territoryId": 1187,
                "name": "Aether Current 2"
            },
            {
                "x": -812.9,
                "y": 105.5,
                "z": 57.5,
                "dataId": 2013930,
                "aetherCurrentId": 2818407,
                "territoryId": 1187,
                "name": "Aether Current 3"
            },
            {
                "x": -458.3,
                "y": -493.9,
                "z": -29.7,
                "dataId": 2013925,
                "aetherCurrentId": 2818405,
                "territoryId": 1187,
                "name": "Aether Current 4"
            },
            {
                "x": -198.5,
                "y": -56.6,
                "z": 23.1,
                "dataId": 2013929,
                "aetherCurrentId": 2818406,
                "territoryId": 1187,
                "name": "Aether Current 5"
            },
            {
                "x": 70.2,
                "y": 746.4,
                "z": 0.7,
                "dataId": 2013931,
                "aetherCurrentId": 2818411,
                "territoryId": 1187,
                "name": "Aether Current 6"
            },
            {
                "x": 353.6,
                "y": -238.8,
                "z": -107.7,
                "dataId": 2013924,
                "aetherCurrentId": 2818404,
                "territoryId": 1187,
                "name": "Aether Current 7"
            },
            {
                "x": -134.6,
                "y": -582.9,
                "z": -93.1,
                "dataId": 2013928,
                "aetherCurrentId": 2818410,
                "territoryId": 1187,
                "name": "Aether Current 8"
            },
            {
                "x": -202.8,
                "y": -199.0,
                "z": -72.1,
                "dataId": 2013926,
                "aetherCurrentId": 2818408,
                "territoryId": 1187,
                "name": "Aether Current 9"
            },
            {
                "x": 414.8,
                "y": -681.0,
                "z": -141.0,
                "dataId": 2013927,
                "aetherCurrentId": 2818409,
                "territoryId": 1187,
                "name": "Aether Current 10"
            }
        ],
        "aetherytes": [
            {
                "x": 332.96704,
                "y": -416.22034,
                "z": -160.11298,
                "name": "Wachunpelo"
            },
            {
                "x": 465.62903,
                "y": 634.9126,
                "z": 114.94617,
                "name": "Worlars Echo"
            }
        ]
    },
    "Yak T'el": {
        "currents": [
            {
                "x": 747.2,
                "y": 712.6,
                "z": -176.4,
                "dataId": 2013953,
                "aetherCurrentId": 2818443,
                "territoryId": 1189,
                "name": "Aether Current 1"
            },
            {
                "x": -114.3,
                "y": 623.8,
                "z": -212.2,
                "dataId": 2013949,
                "aetherCurrentId": 2818436,
                "territoryId": 1189,
                "name": "Aether Current 2"
            },
            {
                "x": -676.6,
                "y": 236.2,
                "z": -164.0,
                "dataId": 2013951,
                "aetherCurrentId": 2818441,
                "territoryId": 1189,
                "name": "Aether Current 3"
            },
            {
                "x": -184.7,
                "y": -751.7,
                "z": 22.9,
                "dataId": 2013947,
                "aetherCurrentId": 2818439,
                "territoryId": 1189,
                "name": "Aether Current 4"
            },
            {
                "x": -550.6,
                "y": -137.7,
                "z": -4.4,
                "dataId": 2013946,
                "aetherCurrentId": 2818438,
                "territoryId": 1189,
                "name": "Aether Current 5"
            },
            {
                "x": 610.8,
                "y": 233.1,
                "z": 9.6,
                "dataId": 2013948,
                "aetherCurrentId": 2818440,
                "territoryId": 1189,
                "name": "Aether Current 6"
            },
            {
                "x": 205.2,
                "y": 161.0,
                "z": -193.6,
                "dataId": 2013952,
                "aetherCurrentId": 2818442,
                "territoryId": 1189,
                "name": "Aether Current 7"
            },
            {
                "x": 39.4,
                "y": -2.3,
                "z": -158.6,
                "dataId": 2013950,
                "aetherCurrentId": 2818437,
                "territoryId": 1189,
                "name": "Aether Current 8"
            },
            {
                "x": -114.4,
                "y": -527.1,
                "z": 5.8,
                "dataId": 2013944,
                "aetherCurrentId": 2818434,
                "territoryId": 1189,
                "name": "Aether Current 9"
            },
            {
                "x": 416.1,
                "y": -545.0,
                "z": 15.5,
                "dataId": 2013945,
                "aetherCurrentId": 2818435,
                "territoryId": 1189,
                "name": "Aether Current 10"
            }
        ],
        "aetherytes": [
            {
                "x": -397.05505,
                "y": -431.93713,
                "z": 23.5141,
                "name": "Iq Braax"
            },
            {
                "x": 721.40076,
                "y": 526.1769,
                "z": -132.31104,
                "name": "Mamook"
            }
        ]
    },
    "Shaaloani": {
        "currents": [
            {
                "x": 380.3,
                "y": -508.2,
                "z": -17.0,
                "dataId": 2013960,
                "aetherCurrentId": 2818452,
                "territoryId": 1190,
                "name": "Aether Current 1"
            },
            {
                "x": 645.6,
                "y": -417.7,
                "z": -11.8,
                "dataId": 2013961,
                "aetherCurrentId": 2818456,
                "territoryId": 1190,
                "name": "Aether Current 2"
            },
            {
                "x": 658.3,
                "y": 83.0,
                "z": 21.0,
                "dataId": 2013963,
                "aetherCurrentId": 2818458,
                "territoryId": 1190,
                "name": "Aether Current 3"
            },
            {
                "x": 183.9,
                "y": -59.3,
                "z": 11.9,
                "dataId": 2013962,
                "aetherCurrentId": 2818457,
                "territoryId": 1190,
                "name": "Aether Current 4"
            },
            {
                "x": -602.9,
                "y": -352.4,
                "z": 37.7,
                "dataId": 2013956,
                "aetherCurrentId": 2818453,
                "territoryId": 1190,
                "name": "Aether Current 5"
            },
            {
                "x": -709.4,
                "y": -80.4,
                "z": 33.4,
                "dataId": 2013955,
                "aetherCurrentId": 2818450,
                "territoryId": 1190,
                "name": "Aether Current 6"
            },
            {
                "x": -192.2,
                "y": -53.2,
                "z": 36.7,
                "dataId": 2013957,
                "aetherCurrentId": 2818454,
                "territoryId": 1190,
                "name": "Aether Current 7"
            },
            {
                "x": -63.2,
                "y": -174.9,
                "z": 18.8,
                "dataId": 2013959,
                "aetherCurrentId": 2818451,
                "territoryId": 1190,
                "name": "Aether Current 8"
            },
            {
                "x": -620.4,
                "y": 323.4,
                "z": -9.1,
                "dataId": 2013958,
                "aetherCurrentId": 2818455,
                "territoryId": 1190,
                "name": "Aether Current 9"
            },
            {
                "x": 296.1,
                "y": 504.0,
                "z": 2.4,
                "dataId": 2013954,
                "aetherCurrentId": 2818449,
                "territoryId": 1190,
                "name": "Aether Current 10"
            }
        ],
        "aetherytes": [
            {
                "x": 386.40417,
                "y": 467.61267,
                "z": -0.19836426,
                "name": "Hhusatahwi"
            },
            {
                "x": -291.70673,
                "y": -114.54956,
                "z": 19.08899,
                "name": "Sheshenewezi Springs"
            },
            {
                "x": 311.36023,
                "y": -567.74243,
                "z": -14.175659,
                "name": "Mehwahhetsoan"
            }
        ]
    },
    "Heritage Found": {
        "currents": [
            {
                "x": 77.5,
                "y": -144.9,
                "z": 93.1,
                "dataId": 2013966,
                "aetherCurrentId": 2818468,
                "territoryId": 1191,
                "name": "Aether Current 1"
            },
            {
                "x": -457.7,
                "y": 693.1,
                "z": -13.4,
                "dataId": 2013973,
                "aetherCurrentId": 2818473,
                "territoryId": 1191,
                "name": "Aether Current 2"
            },
            {
                "x": 397.9,
                "y": 224.2,
                "z": 145.3,
                "dataId": 2013964,
                "aetherCurrentId": 2818464,
                "territoryId": 1191,
                "name": "Aether Current 3"
            },
            {
                "x": -29.0,
                "y": 335.4,
                "z": 71.4,
                "dataId": 2013972,
                "aetherCurrentId": 2818472,
                "territoryId": 1191,
                "name": "Aether Current 4"
            },
            {
                "x": -286.2,
                "y": -263.6,
                "z": 59.5,
                "dataId": 2013971,
                "aetherCurrentId": 2818471,
                "territoryId": 1191,
                "name": "Aether Current 5"
            },
            {
                "x": -585.4,
                "y": -469.4,
                "z": 20.2,
                "dataId": 2013969,
                "aetherCurrentId": 2818466,
                "territoryId": 1191,
                "name": "Aether Current 6"
            },
            {
                "x": 204.6,
                "y": -678.5,
                "z": 58.2,
                "dataId": 2013965,
                "aetherCurrentId": 2818465,
                "territoryId": 1191,
                "name": "Aether Current 7"
            },
            {
                "x": 686.0,
                "y": -516.6,
                "z": 139.2,
                "dataId": 2013968,
                "aetherCurrentId": 2818470,
                "territoryId": 1191,
                "name": "Aether Current 8"
            },
            {
                "x": 606.8,
                "y": -190.4,
                "z": 127.6,
                "dataId": 2013967,
                "aetherCurrentId": 2818469,
                "territoryId": 1191,
                "name": "Aether Current 9"
            },
            {
                "x": -600.1,
                "y": 267.4,
                "z": 2.2,
                "dataId": 2013970,
                "aetherCurrentId": 2818467,
                "territoryId": 1191,
                "name": "Aether Current 10"
            }
        ],
        "aetherytes": [
            {
                "x": 514.6105,
                "y": 207.56836,
                "z": 145.86096,
                "name": "Yyasulani Station"
            },
            {
                "x": -223.0412,
                "y": -584.03906,
                "z": 31.937134,
                "name": "The Outskirts"
            },
            {
                "x": -219.53156,
                "y": 120.77515,
                "z": 32.913696,
                "name": "Electrope Strike"
            }
        ]
    },
    "Living Memory": {
        "currents": [
            {
                "x": -484.2,
                "y": -50.0,
                "z": 38.0,
                "dataId": 2013983,
                "aetherCurrentId": 2818488,
                "territoryId": 1192,
                "name": "Aether Current 1"
            },
            {
                "x": 169.6,
                "y": -308.1,
                "z": 29.2,
                "dataId": 2013982,
                "aetherCurrentId": 2818487,
                "territoryId": 1192,
                "name": "Aether Current 2"
            },
            {
                "x": 232.3,
                "y": 544.5,
                "z": -0.0,
                "dataId": 2013977,
                "aetherCurrentId": 2818484,
                "territoryId": 1192,
                "name": "Aether Current 3"
            },
            {
                "x": 315.2,
                "y": -539.3,
                "z": 43.7,
                "dataId": 2013981,
                "aetherCurrentId": 2818486,
                "territoryId": 1192,
                "name": "Aether Current 4"
            },
            {
                "x": -559.6,
                "y": -508.5,
                "z": -6.0,
                "dataId": 2013980,
                "aetherCurrentId": 2818482,
                "territoryId": 1192,
                "name": "Aether Current 5"
            },
            {
                "x": -516.7,
                "y": 681.0,
                "z": 0.0,
                "dataId": 2013976,
                "aetherCurrentId": 2818483,
                "territoryId": 1192,
                "name": "Aether Current 6"
            },
            {
                "x": -698.9,
                "y": 472.0,
                "z": 1.0,
                "dataId": 2013974,
                "aetherCurrentId": 2818479,
                "territoryId": 1192,
                "name": "Aether Current 7"
            },
            {
                "x": 627.5,
                "y": 637.7,
                "z": 9.0,
                "dataId": 2013978,
                "aetherCurrentId": 2818485,
                "territoryId": 1192,
                "name": "Aether Current 8"
            },
            {
                "x": 753.4,
                "y": 347.1,
                "z": 45.1,
                "dataId": 2013975,
                "aetherCurrentId": 2818480,
                "territoryId": 1192,
                "name": "Aether Current 9"
            },
            {
                "x": 509.7,
                "y": -648.8,
                "z": 37.0,
                "dataId": 2013979,
                "aetherCurrentId": 2818481,
                "territoryId": 1192,
                "name": "Aether Current 10"
            }
        ],
        "aetherytes": [
            {
                "x": -0.22894287,
                "y": 796.9634,
                "z": 57.175537,
                "name": "Leynode Mnemo"
            },
            {
                "x": 657.98413,
                "y": -284.01617,
                "z": 28.976807,
                "name": "Leynode Pyro"
            },
            {
                "x": -255.26825,
                "y": -397.6654,
                "z": 59.433838,
                "name": "Leynode Aero"
            }
        ]
    }
};

// Export for use in browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { aetherData };
}
