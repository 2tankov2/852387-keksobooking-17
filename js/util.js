'use strict';

(function () {
  window.util = {
    // синхронизация полей ввода формы
    synchronFields: function (elementMain, elementDependent, arrMain, arrDependent, funcSyncValues) {
      var numElement = arrMain.indexOf(elementMain.value);
      var elementDependentValue = arrDependent[numElement];
      funcSyncValues(elementDependent, elementDependentValue);
    }
  };
})();
