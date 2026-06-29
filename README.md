# MRP Engine — Frontend Dashboard

React-based dashboard for visualizing Bill of Materials (BOM) hierarchy 
and managing Purchase Order approvals for the Enterprise MRP Engine.

## Tech Stack
- React.js
- Axios (API communication)
- react-d3-tree (BOM hierarchy visualization)

## Prerequisites
- Backend API running at `http://localhost:8080`
  (see [manufacturing-mrp-engine](https://github.com/Cobrooo/manufacturing-mrp-engine))

## Setup
```bash
npm install
npm start
```

Runs on `http://localhost:3000`

## Features
- Select a finished good and target quantity
- Visualize the BOM tree hierarchy
- View Gross/On-Hand/Net requirement calculations
- Approve or reject auto-generated Purchase Orders