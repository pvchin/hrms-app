import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { EmployeesProvider } from "./context/employees_context";
import { LeavesProvider } from "./context/leaves_context";
import { ExpensesProvider } from "./context/expenses_context";
import { PayslipsProvider } from "./context/payslips_context";
import { DailyAllowancesProvider } from "./context/dailyallowances_context";
import { TablesProvider } from "./context/tables_context";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://localhost:4000/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <EmployeesProvider>
        <PayslipsProvider>
          <LeavesProvider>
            <ExpensesProvider>
              <DailyAllowancesProvider>
                <TablesProvider>
                  <App />
                </TablesProvider>
              </DailyAllowancesProvider>
            </ExpensesProvider>
          </LeavesProvider>
        </PayslipsProvider>
      </EmployeesProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
