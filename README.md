# 🌾 India Harvest — Crop Production Analysis

An interactive project exploring India's agricultural crop production from 1997 to 2021. The website presents the project overview, two Tableau Public dashboards, and farm-planning tools.

Website features

- Responsive home page with project overview and analysis highlights.
- Two interactive Tableau Public views on the separate dashboard page.
- Farm weather lookup by Indian city, district, or PIN code.
- Farm-area input and a practical season-preparation checklist.
- Current weather details for temperature, humidity, precipitation, and wind. Weather refreshes every 15 minutes while the page is open.
  
## 📌 Project Overview

India Harvest is a data visualization project designed to analyze agricultural crop production across Indian states and years.

The project helps users explore crop production, cultivated area, agricultural yield, and state-wise agricultural trends through interactive charts, maps, and dashboards.

##🎯 Project Objectives

- Analyze agricultural production trends across agricultural years.
- Compare cultivated areas across different crops and Indian states.
- Identify leading agricultural-producing states.
- Study agricultural production across different seasons.
- Analyze agricultural yield trends.
- Create interactive Tableau visualizations, dashboards, and stories.
- Develop a user-friendly website to display the analysis.
- Deploy the website online for easy access.
  
## ✨ Features

- 📊 Interactive Tableau dashboard
- 🗺️ State-wise agricultural production visualization
- 🌱 Cultivated area and crop production analysis
- 📈 Year-wise agricultural production trends
- 🌾 Crop-wise production comparisons
- 💻 Responsive website interface

  📊 Dataset Information

The project uses an agricultural crop production dataset containing information about India's agricultural activities.

| Attribute | Details |
|---|---|
| States and Union Territories | 36 |
| Districts | 729 |
| Crop Categories | 57 |
| Agricultural Years | 1997–98 to 2020–21 |
| Seasons | 6 |
| Main Measures | Area, Production, Yield |
| Production Units | Tonnes, Bales, Nuts |
| Records | Approximately 345,408, including the header |

 Dataset Fields

- State
- District
- Crop
- Year
- Season
- Area
- Area Units
- Production
- Production Units
- Yield

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend development |
| Flask | Web application framework |
| HTML5 | Website structure |
| CSS3 | Website styling |
| Tableau Desktop | Data analysis and visualization |
| Tableau Public | Publishing interactive dashboards and stories |
| CSV / Excel | Dataset storage and preparation |
| GitHub | Source code management |
| Vercel | Website deployment |

📈 Tableau Visualizations

The project includes the following visualizations:

1. Total Production — KPI Card
2. Total Yield — KPI Card
3. Trend of Agricultural Yield — Line Chart
4. State-wise Agricultural Production — India Map
5. Comparison of Cultivated Area by Crop — Horizontal Bar Chart
6. State-wise Cultivated Area — Treemap / Bar Chart
7. Leading States by Agricultural Production — Packed Bubble Chart
8. Year-wise Total Agricultural Production — Line Chart
9. Production Distribution by Unit Type — Pie Chart
10. Season-wise Agricultural Production Share — Pie Chart

📊 Interactive Dashboard

The Tableau Dashboard combines multiple visualizations into a single interface.

### Dashboard Features

- State-wise agricultural production mapping
- Cultivated area comparisons
- Leading states by production
- Year-wise production trends
- Agricultural yield analysis
- Production distribution across seasons
- Production-unit comparisons
- KPI cards for production and yield
Key Dashboard Values

| Metric | Value |
|---|---:|
| Total Yield | 27.43M |
| Total Production | 330,997.84M units |

*These values represent the aggregations displayed in the Tableau Dashboard.*

## 📖 Tableau Story

The project includes a Tableau Story with eight story points:

1. Agricultural Performance
2. Geographic Distribution
3. Cultivated Area Across Indian States
4. Leading States by Agricultural Production
5. Year-wise Agricultural Production
6. Trend of Agricultural Yield
7. Season-wise Agricultural Production
8. Production Distribution by Unit Type

## 📂 Project Structure

```text
INDIA-S-AGRICULTURAL-CROP-PRODUCTION/
├── index.html
├── dashboard.html
├── script.js
├── styles.css
├── wheat-hero.png
└── README.md
```

## 🌐 Live Website

Visit the deployed project:

https://india-s-agricultural-crop-productio-bice.vercel.app/

Dashboards

- [Production overview](https://public.tableau.com/views/Agricultural_Crop_Production_Backup/Dashboard1?:showVizHome=no)
- [Crop production analysis](https://public.tableau.com/views/IndiasAgriculturalCropProductionAnalysis_Dashboard/Dashboard1?:showVizHome=no)

Both dashboards are hosted on Tableau Public and require an internet connection.

Project files

- `index.html` — home page and farm tools
- `dashboard.html` — switchable Tableau dashboards
- `styles.css` — site styles and responsive layout
- `script.js` — navigation, animation, dashboard switching, and weather lookup
- `wheat-hero.png` — home-page hero image
- `field-hero.png` — additional generated agricultural image

Weather data

Weather lookup uses the location entered on the home page and retrieves current model-based conditions from Open-Meteo. These conditions can differ from readings at the exact farm location. Location search is limited to India.

Weather data: [Open-Meteo](https://open-meteo.com/).

🧹 Data Preparation

The dataset was prepared for analysis by:

- Standardizing field names.
- Converting Area, Production, and Yield into numeric measures.
- Treating State, District, Crop, Season, and unit fields as categorical dimensions.
- Checking for missing and blank values.
- Reviewing negative and zero-production records.
- Reviewing potential outliers before visualization.

Production values may use different units, including Tonnes, Bales, and Nuts. These units should not be treated as directly equivalent.

## ❓ Business Questions

The project investigates the following questions:

- How does agricultural production change across years?
- How does agricultural yield vary over time?
- Which states have the highest recorded agricultural production?
- Which crops occupy the largest cultivated areas?
- How does cultivated area vary among states?
- How is production distributed across seasons?
- How is production distributed across different unit types?
  
## 📊 Interactive Dashboard

The project uses Tableau Public to present interactive agricultural data visualizations.

Explore the dashboard through the website's Dashboard section.

## 📈 Analysis Areas

- State-wise agricultural production
- Crop-wise production analysis
- Cultivated area comparison
- Agricultural yield analysis
- Year-wise production trends
- Leading states in agricultural production

  🔮 Future Scope

Potential improvements include:

- Adding more recent agricultural data.
- Including crop price and market-value analysis.
- Integrating rainfall and weather datasets.
- Adding more detailed crop-level comparisons.
- Improving dashboard filters and interactions.
- Introducing predictive models for agricultural production.
- Automating dataset updates.

## 🚀 Deployment

The website is deployed using Vercel and the source code is maintained in GitHub.

## 👨‍💻 Author

**Vedant Padmawar**

B.Tech — Artificial Intelligence and Data Science

Indira College of Engineering & Management, Pune

## 📄 Project Purpose

This project was developed for educational purposes to demonstrate agricultural data analysis, visualization, and web-based dashboard integration.
