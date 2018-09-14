var app = angular.module("main", []);
app.controller("DemoCtrl", function($scope) {
  $scope.selected = "sdasd";
  $scope.FinalAnswerObject = {};
  let correctAnswer = 0;
  let wrongAnswer = 0;
  let answerData = [2003, 400, "Australia", 49];
  $scope.btnSaveDisabled = true;
  $scope.changedValue = function(item) {
    if (item != undefined) {
      $scope.FinalAnswerObject[item.type] = item.options;
      if (Object.keys($scope.FinalAnswerObject).length == 4) {
        $scope.btnSaveDisabled = false;
      }
    } else {
      $scope.btnSaveDisabled = true;
    }
  };
  google.charts.load("current", { packages: ["corechart", "bar"] });
  google.charts.setOnLoadCallback(drawBasic);
  $scope.save = function() {
    correctAnswer = 0;
    wrongAnswer = 0;
    $scope.btnResetDisabled = false;
    $scope.btnSaveDisabled = true;
    Object.entries($scope.FinalAnswerObject).map(([key, value]) => {
      if (answerData.indexOf(value) != -1) {
        correctAnswer++;
      } else {
        wrongAnswer++;
      }
    });

    google.charts.setOnLoadCallback(drawBasic);
  };
  $scope.resetForm = function() {
    $scope.FinalAnswerObject = {};
    correctAnswer = 0;
    wrongAnswer = 0;
    $scope.btnSaveDisabled = true;
    google.charts.setOnLoadCallback(drawBasic);
  };

  function drawBasic() {
    var data = google.visualization.arrayToDataTable([
      ["Answer", "Score", { role: "style" }],
      ["Right", correctAnswer, "green"],
      ["Wrong", wrongAnswer, "red"]
    ]);

    let options = {
      title: "Test Result",
      hAxis: {
        title: "Answers"
      },
      vAxis: {
        title: "Score (scale of 1-10)"
      }
    };

    let chart = new google.visualization.ColumnChart(
      document.getElementById("chart_div")
    );

    chart.draw(data, options);
  }

  $scope.QuestionsList = [
    {
      id: 1,
      question: "1. When was the last time India won the Cricket World Cup ?",
      dropdown: [
        {
          type: 1,
          options: 2003,
          desc: "some description"
        },
        {
          type: 1,
          options: 2004,
          desc: "some description"
        },
        {
          type: 1,
          options: 2005,
          desc: "some description"
        },
        {
          type: 1,
          options: 2006,
          desc: "some description"
        }
      ]
    },
    {
      id: 2,
      question:
        "2. What is the highest Individual score by a batsman in Test Cricket ?",
      dropdown: [
        {
          type: 2,
          options: 375,
          desc: "some description"
        },
        {
          type: 2,
          options: 345,
          desc: "some description"
        },
        {
          type: 2,
          options: 400,
          desc: "some description"
        },
        {
          type: 2,
          options: 367,
          desc: "some description"
        }
      ]
    },
    {
      id: 3,
      question: "3. Who has won the most number of Cricket World Cups ?",
      dropdown: [
        {
          type: 3,
          options: "Australia",
          desc: "some description"
        },
        {
          type: 3,
          options: "England",
          desc: "some description"
        },
        {
          type: 3,
          options: "India",
          desc: "some description"
        },
        {
          type: 3,
          options: "West Indies",
          desc: "some description"
        }
      ]
    },
    {
      id: 4,
      question:
        "4. How many international centuries does Sachin Tendulkar has under his name ?",
      dropdown: [
        {
          type: 4,
          options: 49,
          desc: "some description"
        },
        {
          type: 4,
          options: 67,
          desc: "some description"
        },
        {
          type: 4,
          options: 98,
          desc: "some description"
        },
        {
          type: 4,
          options: 48,
          desc: "some description"
        }
      ]
    }
  ];
});
