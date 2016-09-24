// @flow

import React from 'react';
import { Link } from 'react-router';

import { getModuleSemExamDate, modulePagePath } from 'utils/modules';
import type { Module } from 'types/modules';

type Props = {
  semester: number,
  modules: Array<Module>,
  onRemoveModule: Function,
};

function TimetableModulesTable(props: Props) {
  return (
    <table className="table">
      <tbody>
        {props.modules.map((module) => {
          return (
            <tr key={module.ModuleCode}>
              <td>
                <Link to={modulePagePath(module.ModuleCode)}>
                  {module.ModuleCode} {module.ModuleTitle}
                </Link>
              </td>
              <td>{module.ModuleCredit}</td>
              <td>{getModuleSemExamDate(module, props.semester)}</td>
              <td>
                <button className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    props.onRemoveModule(module.ModuleCode);
                  }}
                >
                  ✖
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TimetableModulesTable;