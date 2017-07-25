var dashboard = new dashboard();

function dashboard()
{
  init();

  function init()
  {
    document_ready();
  }

  function document_ready()
  {
    action_doughnut_chart();
    action_linegraph_chart();
    action_bar_stackedP_chart();
    /** So On **/
  }

  function action_doughnut_chart()
  {

    var ctx = document.getElementById("pie-chart").getContext('2d');
    var myPieChart3 = new Chart(ctx, {
        type: 'doughnut',
        responsive: true,
        data: {
          labels: expense_name,
          datasets: [{
            backgroundColor: expense_color,
            data: expense_value
          }]
        },
        options: {
          legend: {
            responsive: true,
            display: false,
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItems, data) {
                var sum = data.datasets[0].data.reduce(add, 0);
                function add(a, b) {
                  return a + b;
                }

                return data.datasets[0].data[tooltipItems.index] + ' %';
              },
              // beforeLabel: function(tooltipItems, data) {
              //   return data.datasets[0].data[tooltipItems.index] + ' hrs';
              // }
            }
          }
        },
    });

    $("#pie-chart-content .chart-legend").html(myPieChart3.generateLegend());
  }
  // "#254d6f",
  // "#3682c3",
  // "#0963b1",
  // "#0963b1",
  // "#76a9d6",

  function action_bar_stackedP_chart()
  {
    var barChartData = {
            labels: ["Invoice"],
            datasets: [{
                label: open_invoice + ' Open',
                backgroundColor: "#fbb850",
                data: [open_invoice]
            }, {
                label: overdue_invoice + ' Overdue',
                backgroundColor: "#f58c1f",
                data: [overdue_invoice]
            }, {
                label: paid_invoice + ' Paid',
                backgroundColor: "#f9a32c",
                data: [paid_invoice]
            }]

        };

    var ctx = document.getElementById("bar-chart").getContext("2d");
    ctx.canvas.height = 250;
    var myBarChart = new Chart(ctx, {
        responsive: true,
        type: 'bar',
        data: barChartData,
        options: {
          legend: {
            responsive: true,
            display: false,
          },
          tooltips: {
              mode: 'label'
          },
          scales: {
              xAxes: [{
                  stacked: true,
                  display: false
              }],
              yAxes: [{
                  stacked: true,
                  display: false
              }]
          }
        },
    });

    $("#bar-chart-content .chart-legend").html(myBarChart.generateLegend());

  }

  function action_linegraph_chart()
  {
    var lineChartData = {
        labels: income_date,
        datasets: [{
          data: income_value,
          backgroundColor: "#79b941"
        }]
    };

    var ctx = document.getElementById('line-graph').getContext('2d');
    var myLineChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: lineChartData,
      options: {
          legend: {
            responsive: true,
            display: false,
          },
        },
    });
  }

}
















