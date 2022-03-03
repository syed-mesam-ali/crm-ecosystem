import "./App.css";
import React from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import TableWithData from "./TableWithData";
import logo from "./crm.png";

class App extends React.Component {
  componentDidMount() {
    //initialize datatable
    function formatDigit(d) {
      return d < 10 ? "0" + d.toString() : d.toString();
    }
    var setApplytheme = false;
    $(".btn-theme-apply")
      .off("click")
      .on("click", function () {
        setApplytheme = true;
        for (let i = 1; i < 58; i++) {
          var digit = formatDigit(i);
          var id = "check_" + digit;
          if ($("#" + id).is(":checked")) {
            $("#" + id)
              .parent()
              .parent()
              .addClass("theme-for-tr");
          } else {
            $("#" + id)
              .parent()
              .parent()
              .removeClass("theme-for-tr");
          }
        }
      });
    $("#example").DataTable();
    // create set
    var setForId = new Set();
    var isAllChecked = false;
    $("#example").on("draw.dt", function () {
      if (setApplytheme) {
        for (let i = 1; i < 58; i++) {
          var digit = formatDigit(i);
          var id = "check_" + digit;
          if ($("#" + id).is(":checked")) {
            $("#" + id)
              .parent()
              .parent()
              .addClass("theme-for-tr");
          } else {
            $("#" + id)
              .parent()
              .parent()
              .removeClass("theme-for-tr");
          }
        }
      }
      for (let i = 1; i < 58; i++) {
        var digit = formatDigit(i);
        var id = "check_" + digit;
        if ($("#" + id).is(":checked")) {
          setForId.add(id);
        }
      }

      $(".commonCheck")
        .off("click")
        .on("click", function () {
          if ($("#mainCheckAll").is(":checked")) {
            $("#mainCheckAll").prop("checked", false);
            isAllChecked = false;
          }
          if (setForId.has($(this).attr("id"))) {
            setForId.delete($(this).attr("id"));
          } else {
            setForId.add($(this).attr("id"));
          }
          console.log(setForId);
        });
      $("#mainCheckAll")
        .off("click")
        .on("click", function () {
          setApplytheme = false;
          if ($("#mainCheckAll").is(":checked")) {
            $(".commonCheck").prop("checked", true);
            isAllChecked = true;
          } else {
            $(".commonCheck").prop("checked", false);
            isAllChecked = false;
          }
        });
      if ($("#mainCheckAll").is(":checked")) {
        $(".commonCheck").prop("checked", true);
      }
    });
    $("#example").DataTable().draw();
  }

  render() {
    return (
      <div className="MainDiv">
        <div className="header">
          <div className="headerDiv"></div>
          <div className="titleDiv">
            {/* <img src={logo} alt="Logo"></img> */}
            <span>C360 - Smart CRM Ecosystem</span>
          </div>
          <div>
            <button className="btn btn-primary btn-theme-apply">
              Apply Theme
            </button>
          </div>
        </div>

        <div className="tableDiv">
          <TableWithData />
        </div>
      </div>
    );
  }
}

export default App;
