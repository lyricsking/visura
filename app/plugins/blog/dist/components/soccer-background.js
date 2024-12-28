"use strict";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
const SoccerSVGComponent = (props) => /* @__PURE__ */ jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 500 500",
    style: {
      enableBackground: "new 0 0 500 500"
    },
    xmlSpace: "preserve",
    ...props,
    children: [
      /* @__PURE__ */ jsx("g", { id: "BACKGROUND", children: /* @__PURE__ */ jsx(
        "rect",
        {
          style: {
            fill: "#F4EFD9"
          },
          width: 500,
          height: 500
        }
      ) }),
      /* @__PURE__ */ jsxs("g", { id: "OBJECTS", children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            style: {
              fill: "none",
              stroke: "#231F20",
              strokeMiterlimit: 10
            },
            d: "M189,488"
          }
        ),
        /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              style: {
                fill: "#231F20"
              },
              d: "M57.067,401.986c-3.111-4.527,2.769-11.102,5.961-13.828c-6.366,2.376-12.965,7.71-6.414,14.139 L57.067,401.986z"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              style: {
                fill: "#231F20"
              },
              d: "M63.299,392.238c2.767-0.436,4.957-2.873,6.05-5.357c3.92,3.57-2.638,5.278-5.071,5.616 L63.299,392.238z"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              style: {
                fill: "#231F20"
              },
              d: "M71.343,370.581c1.088-5.014,6.31-6.337,10.18-4.197L71.343,370.581z"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              style: {
                fill: "#231F20"
              },
              d: "M79.983,371.708c0.101,2.863,4.515,2.496,4.08-0.271L79.983,371.708z"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              style: {
                fill: "#231F20"
              },
              d: "M59.737,377.357c-0.22-2.648,1.614-4.442,3.979-3.135L59.737,377.357z"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              style: {
                fill: "#231F20"
              },
              d: "M132.089,356.153c0.051,0.038,0.095,0.08,0.144,0.119c0.004,0.003,0.008,0.005,0.012,0.008 C132.197,356.232,132.139,356.198,132.089,356.153z"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              style: {
                fill: "#231F20"
              },
              d: "M366.657,296.641c-0.531-10.514-11.978-3.381-17.775-2.855c-2.894,0.262-5.846-0.317-8.599-1.174 c-1.388-0.432-2.696-1.132-4.078-1.549c-0.366-0.111-3.014-1.115-3.024-1.11c2.493-1.053,9.922-5.804,4.608-8.173 c-3.15-1.404-5.675,2.381-7.04,5.875c0.925-3.797,1.552-8.807-1.967-8.836c-3.086,0.076-1.03,6.535,0.441,10.551 c-0.327-0.006-0.643,0.014-0.955,0.042c-2.148,0.69-4.075,1.826-5.342,3.525c-1.296,1.694-1.841,3.831-2.483,5.996 c-0.638,2.153-1.316,4.341-2.366,6.381c-1.046,2.031-2.581,3.865-4.53,5.013c1.77-1.415,3.022-3.293,3.894-5.317 c0.87-2.033,1.436-4.187,2.013-6.356c0.293-1.089,0.573-2.169,0.957-3.277c0.408-1.089,0.959-2.164,1.738-3.066 c0.766-0.9,1.733-1.623,2.788-2.103c-2.908-1.04-5.73-2.38-8.542-4.726c-8.447-6.92-16.377-15.111-25.152-22.078 c-7.833-6.497-15.716-15.02-21.288-23.216c-5.573-8.196-7.749-14.227-17.133-16.903c-1.878-0.545-3.466-1.286-4.697-1.965 c-0.836-0.462-1.504-0.892-1.952-1.204c-3.62-2.235-7.221-4.531-10.58-7.175c-3.959-3.123-7.678-6.499-11.708-9.407 c-2.015-1.471-4.088-2.795-6.348-3.722c-2.264-0.935-4.673-1.538-7.119-1.924c-2.451-0.376-4.945-0.495-7.441-0.471 c-2.499-0.001-4.997,0.211-7.494,0.491c4.906-1.075,9.997-1.514,15.059-0.973c2.529,0.261,5.043,0.832,7.44,1.762 c2.422,0.909,4.603,2.332,6.653,3.792c4.128,2.958,7.814,6.397,11.653,9.594c1.914,1.614,3.871,3.149,5.886,4.646 c1.342,1.012,2.669,2.05,3.998,3.083c0.044-3.221-0.714-6.811-1.569-9.81c-0.949-5.185,0.559-6.318,0.883-10.985 c0.374-2.64-1.843-3.628-0.715-6.834c0.94-1.887,3.578-3.87,4.895-6.04c1.699-2.96,3.15-6.261,4.865-9.538 c4.043-2.035,8.235-5.62,11.801-8.3c7.913-5.949,10.215-12.693,13.458-21.323c0.06-0.157,0.123-0.312,0.184-0.468 c-0.659-1.464-1.643-2.701-2.772-3.759c-1.236-1.133-2.637-2.083-4.126-2.875c-1.48-0.811-3.057-1.452-4.668-1.996 c-1.619-0.524-3.275-0.964-5.001-1.218c1.738-0.174,3.518-0.011,5.233,0.392c1.72,0.393,3.39,1.018,4.957,1.854 c1.554,0.852,3.025,1.906,4.217,3.245c1.075,1.182,1.903,2.633,2.232,4.175c3.157-8.06,7.112-15.714,8.341-24.391 c1.181-8.337-5.111-13.282-11.701-17.526c-1.19-1.503-2.664-2.996-4.465-4.484c0.11-0.233,0.197-0.46,0.289-0.689 c-0.727,1.263-1.634,2.422-2.617,3.48c-1.377,1.512-2.935,2.81-4.407,4.168c-0.732,0.681-1.49,1.353-2.152,2.058 c-0.675,0.72-1.33,1.482-1.989,2.241c-2.673,2.995-5.351,6.102-8.763,8.425c-0.856,0.569-1.768,1.075-2.751,1.435 c-0.977,0.354-2.064,0.553-3.123,0.347c-1.06-0.207-1.98-0.835-2.648-1.612c-0.681-0.777-1.147-1.694-1.518-2.628 c0.478,0.885,1.028,1.736,1.73,2.428c0.7,0.689,1.582,1.176,2.523,1.28c1.909,0.232,3.741-0.809,5.303-1.944 c3.154-2.38,5.771-5.447,8.422-8.458c0.673-0.75,1.343-1.504,2.056-2.24c0.729-0.749,1.491-1.4,2.243-2.077 c1.519-1.332,3.041-2.635,4.47-4.011c1.42-1.381,2.684-2.926,3.53-4.712c0.214-0.428,0.397-0.871,0.555-1.323 c0.251-1.405,0.408-2.844,0.788-4.454c0.797-3.253,2.585-6.367,3.052-9.668c0.042-0.228,0.076-0.455,0.115-0.683 c3.039,0.836,6.063,1.25,8.549,0.459c-1.125-0.75-3-2.25-3.25-3.625c2.375,1.125,4.75,2.125,7.5,2C293,80,299.5,78,299,74.125 c-0.75,1.375-3.5,1.75-4.875,1.625c2.5-1.875,5.5-5.5,4.125-8.75c-0.25,0.5-0.625,1.125-1.125,1.5c-5.125,4.25-9.25,1.25-13-2.75 c-3.625-3.75-6.625-8-10-12c-5-5.75-10.25-11.625-18.375-11.5c-6.25,0.125-10.25,3.75-12.5,9.25c-6-1-6.25,3.75-7.5,8.5 c-0.825,3.653-2.424,9.303-0.93,12.871c0.181,0.015,0.362,0.032,0.537,0.077c0.872,0.232,1.684,0.762,2.183,1.483 c0.517,0.7,0.826,1.503,0.963,2.323c0.106,0.81,0.109,1.698-0.314,2.399c0.179-0.779,0.051-1.558-0.214-2.268 c-0.241-0.714-0.626-1.378-1.104-1.908c-0.48-0.527-1.08-0.88-1.749-1.011c-0.647-0.136-1.311-0.015-1.902,0.335 c-1.207,0.683-2.096,2-2.743,3.353c-0.312,0.691-0.579,1.414-0.743,2.164c-0.192,0.749-0.25,1.525-0.153,2.318 c-0.489-1.176-0.465-2.506-0.184-3.767c-3.824-1.667-7.666-3.358-11.547-5.139c-3.161-1.458-7.167-1.689-10.328-3.146 c-2.783-1.741-3.729-4.568-7.36-5.083l-2.124-1.647c-1.796-1.604-3.957-1.823-6.045-1.061c-0.615-0.597-1.228-1.197-1.826-1.818 c-1.673-1.739-3.451-3.327-5.031-5.136c-1.124-1.495-2.213-3.234-3.616-4.518c-0.171-0.156-0.36-0.288-0.547-0.424 c-0.987-0.39-1.969-0.785-2.931-1.24c-0.485-0.24-0.969-0.485-1.436-0.773c-0.233-0.144-0.466-0.292-0.689-0.466 c-0.22-0.18-0.443-0.357-0.622-0.659c-0.042-0.071-0.038-0.157,0.003-0.223l0.031-0.05l0.13-0.207 c0.039-0.071,0.103-0.128,0.129-0.209l0.076-0.244c0.02-0.083,0.067-0.159,0.066-0.25c0.009-0.176,0.041-0.351,0.045-0.531 c-0.012-0.18-0.017-0.362-0.034-0.545l-0.108-0.542l-0.169-0.531c-0.064-0.174-0.153-0.338-0.229-0.512 c-0.092-0.162-0.204-0.313-0.306-0.479c0.131,0.135,0.282,0.263,0.401,0.417c0.105,0.161,0.226,0.317,0.322,0.487 c0.194,0.341,0.317,0.715,0.422,1.097c0.038,0.194,0.064,0.392,0.096,0.59c0.02,0.2-0.001,0.405-0.006,0.609 c0.005,0.102-0.042,0.203-0.063,0.305l-0.081,0.305c-0.055,0.132-0.134,0.258-0.214,0.382c0.108,0.134,0.255,0.272,0.417,0.395 c0.204,0.154,0.419,0.305,0.642,0.445c0.391,0.243,0.794,0.478,1.199,0.708c0.329-1.019,0.339-2.123-0.126-3.204 c-0.492-1.239-1.429-2.289-2.026-3.375c-0.667-1.179-1.229-2.511-2.177-3.479c-2.129-2.054-3.798-0.288-6.1,0.054 c-1.367,0.224-2.116-0.383-3.377,0.272c-1.098,0.679-1.844,1.826-2.919,2.34c-1.168,0.587-2.127,0.283-3.107,1.313 c-0.759,0.644-1.47,1.545-1.621,2.608c-0.301,2.127,1.396,4.287,1.854,6.355c0.258,1.122,0.225,1.951-0.183,3.062 c-0.536,1.426-0.723,1.567,0.272,2.793c1.498,1.797,2.959,2.672,5.284,1.583c1.156-0.504,1.693-0.762,3.014-0.658 c0.247,0.035,0.581,0.118,0.922,0.197c0.086,0.126,0.183,0.247,0.247,0.385c1.125,2.663,1.315,5.444,3.597,7.604 c2.129,2.054,5.053,3.804,7.719,5.016c-0.313,2.793-0.111,4.908,0.932,7.56c0.225,0.52,0.601,1.399,1.076,2.33 c0.386-2.076,0.845-4.136,1.363-6.186c0.555-2.044,1.066-4.137,1.994-6.109c0.886-1.976,2.282-3.772,4.067-4.948 c-1.517,1.508-2.567,3.334-3.287,5.276c-0.726,1.943-1.179,4-1.711,6.052c-0.524,2.047-1.035,4.103-1.589,6.148 c-0.535,2.051-1.132,4.086-1.743,6.128c0,0,11.664,17.475,8.708,28.84c-0.529,1.918-1.056,3.852-1.579,5.792l3.966,1.44 c3.112,1.202,6.232,2.419,9.179,4.107c2.927,1.677,5.572,3.714,8.463,5.242c2.907,1.497,6.077,2.485,9.259,3.439 c3.185,0.949,6.378,1.912,9.549,2.946c6.321,2.076,12.637,4.519,18.137,8.318c-5.689-3.497-12.016-5.682-18.356-7.62 c-3.179-0.965-6.398-1.803-9.598-2.738c-3.196-0.928-6.422-1.911-9.465-3.426c-3.034-1.533-5.7-3.572-8.516-5.263 c-2.812-1.667-5.913-2.909-8.986-4.149c-4.828-1.994-9.81-3.764-14.501-6.123c-1.264-0.583-2.508-1.243-3.721-2.042 c0.009-0.047,0.02-0.113-0.004-0.002c-0.38-0.161-0.76-0.321-1.154-0.471c-3.254-1.222-6.309-3.179-9.564-4.401 c-2.36-0.81-4.477,2.032-6.035,3.62c-1.797,1.935-3.675,3.764-5.299,5.819c-1.145,1.361-3.019,5.855,0.62,5.038 c-1.265,1.535,1.538,4.598,3.216,2.836c-1.331,2.001,2.232,4.41,3.872,4.928c0.813,0.306,2.174,0.784,3.013,0.236 c1.066-0.801,0.624-2.387-0.443-2.919c0.852-0.641,1.638-1.482,2.478-1.362c0.467,0.066,1.427,0.678,1.868,0.931 c2.334,0.997,4.735,2.194,7.242,2.644c1.716,0.391,4.98,0.708,6.814-0.477c0.671,0.256,1.273,0.499,1.741,0.732 c0.988,0.526,1.99,1.073,2.996,1.63c-0.892,3.985-1.663,7.976-2.225,11.945c-0.654,4.621-1.025,9.618-1.68,14.238 c-0.794,5.611-4.846,8.067-6.491,12.547c-0.657,2.263,1.136,3.864,0.573,5.467c-0.611,1.934-2.778,2.973-3.388,4.907 c-0.751,2.924-0.509,8.345-0.977,11.645c-0.429,3.032-0.644,6.651,0.273,9.706c-0.525,1.956-0.954,3.944-1.15,5.993 c-0.698,7.307,0.114,15.839,2.525,22.577c4.27,10.953,13.017,14.667,22.865,16.241c-0.501,1.575-1.573,2.9-1.249,4.664 c0.426,1.743,4.01,2.588,4.106,4.284c0.333,2.404-2.448,3.021-2.729,5c-0.043,2.688,1.752,6.646,1.992,9.711 c0.957,12.254,5.545,25.023,3.816,37.234c1.083-0.52,2.687,0.045,3.724-0.145c0.195,5.75-1.353,11.928-0.167,17.818 c-8.158-1.828-13.111-4.887-21.263-2.002c-5.608,1.563-9.846,5.34-15.314,5.91c-5.751,0.195-12.068-0.361-17.349-1.109 c-3.578-0.508-12.069-2.326-18.565-2.494c-4.366-4.648-12.227-9.977-17.415-7.314c-0.148,0.778-0.318,1.602-0.501,2.452 c-2.01,1.117-5.536,0.272-5.008,3.745c1.813,0.367,2.535,0.689,2.507,2.439c-0.03,0.984-0.244,1.721-0.873,2.291 c-0.767,0.77-2.012,0.264-2.519,0.74c-1.979,1.584,0.465,3.685,0.913,5.174c0.202,0.494,0.328,1.042,0.43,1.603 c-0.631,1.737-1.284,3.369-1.945,4.804c-2.69,5.727-5.677,10.103-7.556,15.266c-0.887-0.002-1.827-0.072-2.637-0.188 c-0.368,1.045-1.441,2.43-0.933,3.488c0.437,0.764,1.508,0.905,2.263,1.412c-0.163,0.842-0.302,1.704-0.396,2.611 c-0.418,5.328-2.045,23.951,7.135,13.805c6.403-7.174,7.241-15.471,16.38-20.572c2.921-1.607,11.125-0.107,11.596-1.051 c1.037-1.607,0.402-2.906-0.871-3.91c-1.139-0.876-2.546-1.197-3.918-1.525c-0.696-0.155-1.393-0.321-2.095-0.517 c-0.699-0.201-1.41-0.429-2.076-0.864c-0.332-0.204-0.651-0.541-0.867-0.814c-0.235-0.281-0.483-0.548-0.688-0.866 c-0.447-0.601-0.783-1.286-1.075-1.986c-0.552-1.426-0.635-3.018-0.352-4.501c0.616-2.991,2.385-5.466,4.285-7.617 c1.918-2.174,4.121-4.02,6.303-5.873c-1.877,2.17-3.87,4.228-5.633,6.437c-0.871,1.111-1.708,2.244-2.382,3.46 c-0.702,1.197-1.23,2.482-1.5,3.801c-0.137,0.66-0.175,1.33-0.15,1.994c0.045,0.664,0.182,1.317,0.382,1.955 c0.237,0.624,0.507,1.247,0.896,1.809c0.169,0.293,0.389,0.568,0.597,0.848c0.214,0.298,0.381,0.494,0.648,0.688 c1.532,1.034,3.625,1.375,5.472,2.19c4.113-1.896,8.397-3.499,13.054-3.726c9.475-0.342,18.953,1.674,28.287,2.322 c9.791,0.713,19.92,2.22,30.005,2.971c-2.127-1.128-3.838-3.016-5.024-5.14c-1.21-2.131-1.946-4.505-2.316-6.918 c-0.35-2.417-0.322-4.895,0.171-7.288c0.476-2.386,1.441-4.709,2.971-6.567c-1.171,2.099-1.802,4.397-2.125,6.71 c-0.303,2.32-0.282,4.679,0.071,6.986c0.333,2.309,0.987,4.573,1.986,6.68c1.014,2.09,2.381,4.049,4.27,5.536 c5.016,0.374,10.021,0.564,14.968,0.37c19.327-0.967,17.04-20.48,20.464-35.147c3.47-14.992,5.01-28.242,5.888-43.939 c0.608-7.959,0.413-15.832,0.951-23.709c0.826-0.105,1.648-0.229,2.462-0.385c2.225,8.058,7.844,15.924,13.415,21.762 c6.136,6.592,14.718,7.809,21.7,13.174c6.983,5.367,14.106,9.74,20.76,15.061c2.736,2.07,6.229,5.932,9.06,7.344 c0.232,0.123,0.432,0.238,0.611,0.348c-3.08,1.297-5.243,4.535-0.463,5.732c-1.277,7.055-0.093,13.063,6.104,14.612 c0.241,0.857,0.62,1.702,0.915,2.505c1.103-0.063,1.456,0.533,2.129-0.355c0.283-0.338,0.409-1.025,0.476-1.772 c0.347-0.001,0.681,0.009,1.049-0.012c1.511-0.06,2.862-0.337,4.103-0.771c0.302,0.66,0.668,1.236,0.989,1.411 c0.612,0.307,2.128-0.354,2.71-0.6c-0.03-0.87-0.062-1.763-0.145-2.644c0.609-0.421,1.193-0.88,1.759-1.366 c0.534,0.661,1.105,0.854,2.103,0.16c1.262-0.83,1.234-1.927,0.942-3.118c3.281-3.462,6.423-7.253,11.326-8.894 c0.208-0.082,0.422-0.169,0.64-0.257c0.351,0.543,0.697,1.082,0.972,1.546c0.597-0.354,1.377-0.461,1.975-0.815 c0.043-0.616,0.031-1.295-0.002-1.979c1.452-0.647,2.994-1.384,4.54-2.216c0.377,0.605,0.755,1.082,1.034,1.158 c0.627,0.197,1.27-0.478,1.76-0.846c0.871-0.75,1.071-0.613,1.116-1.703c0.007-0.224-0.043-0.528-0.122-0.866 c1.685-1.119,3.275-2.358,4.64-3.723c0.903,1.055,1.768,1.599,3.364-0.089c0.082-0.959-0.332-1.987-0.859-2.992 C366.06,301.4,366.799,299.134,366.657,296.641z M219.149,162.757c0.613,0.514,1.249,1.001,1.869,1.5 c1.268,0.967,2.557,1.903,3.912,2.744c2.691,1.702,5.476,3.252,8.344,4.641c2.856,1.414,5.801,2.648,8.775,3.808 c1.489,0.578,2.995,1.11,4.517,1.599c1.518,0.505,3.054,0.947,4.621,1.311c-1.607-0.117-3.188-0.459-4.766-0.792 c-1.565-0.388-3.115-0.835-4.653-1.321c-3.073-0.984-6.069-2.207-8.975-3.618c-2.894-1.432-5.715-3.036-8.336-4.933 c-1.317-0.939-2.571-1.964-3.783-3.03c-0.576-0.569-1.163-1.123-1.725-1.7c-0.538-0.603-1.064-1.214-1.58-1.827 C217.972,161.674,218.566,162.212,219.149,162.757z M237.635,301.039c-1.026-1.088-2.353-1.834-3.766-2.27 c-2.848-0.864-5.936-0.724-8.913-0.256c-2.997,0.461-5.934,1.328-8.829,2.305c-1.448,0.493-2.877,1.048-4.285,1.655 c-1.423,0.577-2.807,1.242-4.182,1.945c2.515-1.803,5.304-3.201,8.168-4.388c2.869-1.182,5.863-2.099,8.955-2.603 c3.073-0.457,6.341-0.587,9.364,0.543c1.489,0.568,2.882,1.474,3.891,2.712c0.982,1.257,1.601,2.743,1.866,4.263 C239.401,303.489,238.691,302.105,237.635,301.039z M266.424,244.318c-2.024,0.365-3.974,1.05-5.695,2.116 c-1.735,1.045-3.221,2.474-4.449,4.117c-1.22,1.653-2.201,3.504-3.045,5.447c0.437-2.067,1.178-4.106,2.34-5.931 c1.142-1.832,2.717-3.425,4.582-4.572c1.871-1.136,3.999-1.822,6.147-2.027c2.148-0.227,4.304-0.014,6.358,0.488 C270.547,243.877,268.452,243.963,266.424,244.318z M330.364,287.054l-0.239,0.891c-0.09,0.253-0.112,0.522-0.251,0.759 c-0.03,0.051-0.078,0.107-0.14,0.097c-0.039-0.006-0.067-0.037-0.09-0.066c-0.108-0.14-1.888-5.317-1.862-6.602 c0.011-0.536-0.035-1.204,0.1-1.727c0.006-0.022,0.013-0.044,0.02-0.066c0.139-0.396,0.574-0.685,0.993-0.791 c0.127-0.032,0.264-0.002,0.385,0.046c1.568,0.626,1.522,2.903,1.458,4.217C330.688,284.899,330.507,285.975,330.364,287.054z  M331.889,289.259c-0.068-0.014-0.124-0.005-0.155-0.043c-0.046-0.057-0.055-0.134-0.056-0.207 c-0.006-0.568,0.812-2.115,0.931-2.379c0.119-0.263,0.286-0.501,0.452-0.737c0.578-0.823,1.248-1.604,2.143-2.09 c0.565-0.306,1.344-0.618,1.992-0.408c0.611,0.199,0.714,0.857,0.655,1.42c-0.191,1.814-2.52,3.098-3.97,3.723 C333.525,288.691,332.36,289.354,331.889,289.259z"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(
          "path",
          {
            style: {
              fill: "#231F20"
            },
            d: "M377.692,222.652c-14.901-2.11-28.691,8.258-30.802,23.159 c-2.111,14.902,8.258,28.691,23.158,30.802c14.901,2.111,28.692-8.258,30.803-23.158 C402.962,238.553,392.594,224.763,377.692,222.652z"
          }
        ),
        /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("rect", { id: "SVGID_1_", width: 500, height: 500 }) }),
          /* @__PURE__ */ jsx("clipPath", { id: "SVGID_00000083090358913934837540000006018286806621943221_", children: /* @__PURE__ */ jsx(
            "use",
            {
              xlinkHref: "#SVGID_1_",
              style: {
                overflow: "visible"
              }
            }
          ) }),
          /* @__PURE__ */ jsx(
            "g",
            {
              style: {
                clipPath: "url(#SVGID_00000083090358913934837540000006018286806621943221_)"
              },
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  style: {
                    fill: "#231F20"
                  },
                  d: "M510.334,421.333c1-1.666,1.333-3.333,1-5.333c-1,2-2.667,4.333-5,5 c0.666-0.667,0.666-1.333,1.666-2.333c-2,0.666-4,1.666-6,2.333c0.667-1.667,1-3,2.334-4.333c-3,0.666-5,2.666-7.334,2.666 c0.334-1,0-2,0.667-3c-2,2-4.333,3.334-6.667,5c0.334-0.666,0.667-1.666,1-2.333c-1.666-0.333-3,0.333-4.333,2 c0.667-1.667,0.667-3,0.333-4.667c-1,2-2,4.334-3.666,5.667c0-1-0.334-3,0-4.333c-2.334,1-4.334,3.333-7,3 c1-0.667,2.333-2.667,3-3.667c-2.667-0.333-4.334,2-5.667,4c0.333-1.333-0.333-3,0-4.333c-0.667,1.333-2,2.666-2.333,4 C472,420,471,418.333,471,417.333c-1.333,1.667-3,3.667-5,4c0.667-0.666,1-2.666,1.667-3.666c-2,0.333-3.667,1.333-5,2.666 c0.333-1.333-0.333-3-0.333-4.333c-0.667,1.333-2,3.333-3,4.333c0-0.666-0.667-2-0.667-3c-0.333,0.667-2,2.334-2.333,3.667 c-0.667-1.667-1-3,0-4.667c-3,1-5,3.667-7.667,5c0.333-1.666,0.667-3,1.667-4.666c-1.667,1.333-3.667,2.666-5.334,4 c1-1.667,1-3,0.667-4.667c-1,1.667-2,3.667-3.333,5.333c0.333-1.666,0.333-3.666,0.333-5.333 c-1.333,2.333-3.333,3.667-5.667,4.667c0.667-1,0.667-2.334,1.334-3.334C436,418,434,419.667,432.667,421.667 c0.333-0.667,0.667-1.667,1-2.667c-2.333,0-5,1-6.333,3c0.333-1.667-0.334-3.333-0.334-4.667c-1,1.667-2.333,3-3.666,4 C423.334,420,423,419,423,418c-1,1.333-2.666,2.667-4,3.333c0.334-1.333,0-2.333,0.334-3c-1.667,0.334-3.334,1.667-4.667,3 c0-1.333-0.667-3-1-4.333c-1.333,1.667-3,3-5,4.333c1-1,1.333-2.666,1.667-3.666c-2.334,0-4,2-5.334,3.666 c0-1.666-0.666-3.333-1-4.666C403,419,400.667,421,398,421c0.667-0.667,1-2.333,1.334-3.333c-1.667,1-3.334,1.666-5,2.666 c0.333-1.333-0.667-3-0.334-4.333c-1.333,2.333-3.333,4.333-5.666,5.333C389,420,388.667,418,389,417 c-1.666,0.667-2.666,0.667-3.666,2.667c0-1.334-0.334-2.667-0.334-4c-0.666,2.333-2.666,5-5,6c0.334-1,0.334-2.667,0.334-4 c-0.667,1-2.334,1.666-3,3c-0.334-1-1-2.667-1.334-3.667c-1,1.333-2.333,3-3.666,4c0.333-1,0.333-2.667,0.333-4 c-1,1-2.333,2-3,3.667c0-1.334-1-2.667-1.333-3.667c-0.667,1.667-2,3.333-3.667,4.333c0.247-0.989,0.128-1.98,0.186-2.97 c0.047-0.288,0.103-0.575,0.147-0.863c-0.013,0.013-0.025,0.022-0.039,0.034c0.014-0.067,0.023-0.134,0.039-0.201 c-0.266,0.304-0.537,0.591-0.812,0.87c-1.738,1.31-3.526,1.432-5.688,2.297c1-1,1.5-2.5,2-3.5c-2.5,1.5-5,3-8,4 c0.5-1.5,1-3.5,1.5-4.5c-2,2-4,3-5.5,4c0.5-1,0.5-2.5,1-3.5c-3,2-6,4-10,4c0.5-1,0.5-2.5,1-3.5c-1.5,2.5-3.5,3.5-6,5 c0.5-1,0-2.5,0-4c-1.5,2.5-4.5,3.5-7,3.5c0.5-1,0.5-3,1-4c-1.5,1-4.5,1.5-6,2.5c0.5-1.5,0.5-3,1-4.5c-3,2.5-6.5,4-10,4.5 c0.5-1,1-2,1-3c-1,1.5-3.5,2.5-5,4.5c0-1.5-0.5-3-0.5-4.5c-1.5,3-4.5,4.5-7.5,4.5c1-2,0.5-4.5,1.5-6c-1.5,1.5-3.5,2.5-4.5,4 c0-0.5-0.5-2-0.5-3c-1,1.5-3,2.5-4,4c1-1.5,1-3,1.5-4c-1.5,1.5-3.5,2.5-5,4c0-1.5-1-3.5-1-5c-1,1.5-3,3-4,4c0.5-1.5,0-3.5,0.5-5 c-1.5,1.5-4,3-5,4.5c0-1.5-1.5-3-1.5-4.5c-1,3-3.5,5.5-6,7c1-2,1-4,1.5-5.5c-1.5,1.5-4,2.5-5.5,4c1-2,1-3.5,1.5-5.5 c-3,3.5-7.5,7.5-12,8.5l2.5-1c1-2.5,1-4.5,0.5-7c-2.347,1.592-4.479,3.426-6.441,5.425c0.818-1.532,1.081-3.088,0.775-4.925 c-1,2-2.667,4.333-5,5c0.666-0.667,0.666-1.333,1.666-2.333c-2,0.666-4,1.666-6,2.333c0.667-1.667,1-3,2.333-4.333 c-3,0.666-5,2.666-7.333,2.666c0.333-1,0-2,0.667-3c-2,2-4.334,3.334-6.667,5c0.333-0.666,0.667-1.666,1-2.333 c-1.667-0.333-3,0.333-4.333,2c0.666-1.667,0.666-3,0.333-4.667c-1,2-2,4.334-3.667,5.667c0-1-0.333-3,0-4.333 c-2.333,1-4.333,3.333-7,3c1-0.667,2.334-2.667,3-3.667c-2.666-0.333-4.333,2-5.666,4c0.333-1.333-0.334-3,0-4.333 c-0.667,1.333-2,2.666-2.334,4C217,420,216,418.333,216,417.333c-1.333,1.667-3,3.667-5,4c0.667-0.666,1-2.666,1.667-3.666 c-2,0.333-3.667,1.333-5,2.666c0.333-1.333-0.334-3-0.334-4.333c-0.666,1.333-2,3.333-3,4.333c0-0.666-0.666-2-0.666-3 c-0.334,0.667-2,2.334-2.334,3.667c-0.666-1.667-1-3,0-4.667c-3,1-5,3.667-7.666,5c0.333-1.666,0.666-3,1.666-4.666 c-1.666,1.333-3.666,2.666-5.333,4c1-1.667,1-3,0.667-4.667c-1,1.667-2,3.667-3.334,5.333c0.334-1.666,0.334-3.666,0.334-5.333 c-1.334,2.333-3.334,3.667-5.667,4.667c0.667-1,0.667-2.334,1.333-3.334C181,418,179,419.667,177.667,421.667 c0.333-0.667,0.666-1.667,1-2.667c-2.334,0-5,1-6.334,3c0.334-1.667-0.333-3.333-0.333-4.667c-1,1.667-2.333,3-3.667,4 C168.333,420,168,419,168,418c-1,1.333-2.667,2.667-4,3.333c0.333-1.333,0-2.333,0.333-3c-1.666,0.334-3.333,1.667-4.666,3 c0-1.333-0.667-3-1-4.333c-1.334,1.667-3,3-5,4.333c1-1,1.333-2.666,1.666-3.666c-2.333,0-4,2-5.333,3.666 c0-1.666-0.667-3.333-1-4.666C148,419,145.667,421,143,421c0.667-0.667,1-2.333,1.333-3.333c-1.666,1-3.333,1.666-5,2.666 c0.334-1.333-0.666-3-0.333-4.333c-1.333,2.333-3.333,4.333-5.667,5.333C134,420,133.667,418,134,417 c-1.667,0.667-2.667,0.667-3.667,2.667c0-1.334-0.333-2.667-0.333-4c-0.667,2.333-2.667,5-5,6c0.333-1,0.333-2.667,0.333-4 c-0.666,1-2.333,1.666-3,3c-0.333-1-1-2.667-1.333-3.667c-1,1.333-2.333,3-3.667,4c0.334-1,0.334-2.667,0.334-4 c-1,1-2.334,2-3,3.667c0-1.334-1-2.667-1.334-3.667c-0.666,1.667-2,3.333-3.666,4.333c0.333-1.333,0-2.666,0.333-4 c-2.047,2.341-4.352,3.91-6.913,5.161c0.345-1.661,0.66-3.324,0.913-4.994c-2,2-4,2-6.5,3c1-1,1.5-2.5,2-3.5c-2.5,1.5-5,3-8,4 c0.5-1.5,1-3.5,1.5-4.5c-2,2-4,3-5.5,4c0.5-1,0.5-2.5,1-3.5c-3,2-6,4-10,4c0.5-1,0.5-2.5,1-3.5c-1.5,2.5-3.5,3.5-6,5 c0.5-1,0-2.5,0-4c-1.5,2.5-4.5,3.5-7,3.5c0.5-1,0.5-3,1-4c-1.5,1-4.5,1.5-6,2.5c0.5-1.5,0.5-3,1-4.5c-3,2.5-6.5,4-10,4.5 c0.5-1,1-2,1-3c-1,1.5-3.5,2.5-5,4.5c0-1.5-0.5-3-0.5-4.5c-1.5,3-4.5,4.5-7.5,4.5c1-2,0.5-4.5,1.5-6c-1.5,1.5-3.5,2.5-4.5,4 c0-0.5-0.5-2-0.5-3c-1,1.5-3,2.5-4,4c1-1.5,1-3,1.5-4c-1.5,1.5-3.5,2.5-5,4c0-1.5-1-3.5-1-5c-1,1.5-3,3-4,4c0.5-1.5,0-3.5,0.5-5 c-1.5,1.5-4,3-5,4.5c0-1.5-1.5-3-1.5-4.5c-1,3-3.5,5.5-6,7c1-2,1-4,1.5-5.5c-1.5,1.5-4,2.5-5.5,4c1-2,1-3.5,1.5-5.5 c-3,3.5-7.5,7.5-12,8.5l2.5-1c1-2.5,1-4.5,0.5-7c-14,9.5-21,27-23,43.5c-2,14,3,28,13,37.5c16.5,15,40,16.5,61.5,12.5 c3.644-0.656,6.971-1.53,10.022-2.606c7.219,2.742,15.64,2.532,24.812,2.939C101,510,115.667,511,129,507 c10.667-3.333,163,6,184.5,2c2.484-0.447,4.819-0.997,7.025-1.641c6.515,1.733,13.882,1.622,21.809,1.974 C356,510,370.667,511,384,507c10.667-3.333,120.333,13.166,126,6.5c7.666-9.334-4-79.5,1.334-87.5c2.333-3,2.333-6,4-9 C513.334,418.333,511.667,419.667,510.334,421.333z"
                }
              )
            }
          )
        ] })
      ] })
    ]
  }
);
export default React.memo(SoccerSVGComponent);
//# sourceMappingURL=soccer-background.js.map
