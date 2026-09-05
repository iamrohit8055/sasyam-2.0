SASYAM
AI-Powered Farm-to-Market Intelligence Platform
Problem Statement: 26193
Product: SASYAM
Version: 1.0
Document Type: Product Requirements Document (PRD)
Primary Users: Farmers, Transporters, Buyers, Processors, Administrators
1. Product Overview
1.1 Product Name
SASYAM
1.2 One-Line Product Idea
SASYAM is an AI-powered digital platform that helps farmers make better crop
decisions, reduce post-harvest losses, find better markets, and coordinate
transportation from farm to buyer.
1.3 Product Vision
SASYAM aims to become a digital intelligence layer connecting the entire agricultural
supply chain:
Crop Planning → Cultivation → Harvest → Post-Harvest → Market → Transportation →
Buyer → Payment
Instead of providing isolated agricultural information, SASYAM provides actionable
recommendations at every major decision point.
2. Problem Statement
Farmers face decision-making challenges throughout the agricultural lifecycle.
2.1 Before Harvest
Farmers may need to determine:
• Which crop should be cultivated?
• Is the crop suitable for the soil?
• Is sufficient water available?
• What weather conditions are expected?• When should irrigation happen?
• Is there a potential disease risk?
• When should the crop be harvested?
2.2 After Harvest
Once produce is harvested, additional problems arise:
• Finding buyers
• Determining current market prices
• Comparing multiple markets
• Finding transportation
• Managing harvested inventory
• Preventing spoilage
• Deciding whether to sell immediately
• Deciding whether to store
• Finding processors
• Coordinating transportation and delivery
SASYAM addresses these problems through a single connected platform.
3. Product Goals
3.1 Primary Goals
SASYAM should:
1. Help farmers make better crop-planning decisions.
2. Provide AI-assisted agricultural recommendations.
3. Detect potential crop diseases from images.
4. Help farmers understand market prices.
5. Compare potential selling locations.
6. Calculate expected net realization after costs.
7. Help farmers manage harvested produce.
8. Estimate post-harvest spoilage risk.9. Recommend whether produce should be sold, stored, or processed.
10. Connect farmers with buyers and processors.
11. Match farmers with suitable transporters.
12. Provide live transportation tracking.
13. Automatically notify relevant stakeholders.
14. Provide a connected farm-to-buyer workflow.
4. Non-Goals
The first version of SASYAM will NOT attempt to:
• Replace professional agricultural experts.
• Guarantee crop yields.
• Guarantee market prices.
• Guarantee disease diagnoses.
• Operate physical warehouses.
• Operate its own transportation fleet.
• Process agricultural products physically.
• Provide financial loans.
• Guarantee transactions between users.
AI recommendations should be treated as decision-support, not absolute guarantees.
5. Target Users
SASYAM has five primary user roles.
5.1 Farmer
The primary user.
The farmer can:
• Create a farm profile
• Add fields
• Enter soil information• Add crops
• Receive recommendations
• Detect possible diseases
• Record harvests
• Manage produce inventory
• Compare market prices
• Find buyers
• Request transportation
• Track deliveries
• Receive alerts
• Monitor transactions
5.2 Transporter
Transporters provide transportation between farms and destinations.
They can:
• Create transporter profile
• Add vehicles
• Specify vehicle capacity
• Set availability
• Receive transport requests
• Accept/reject requests
• View pickup and delivery locations
• Update delivery status
• Share live GPS location
• Complete deliveries
5.3 Buyer
Buyers may include:• Wholesalers
• Retailers
• Restaurants
• Local businesses
• Cooperatives
• Other agricultural buyers
They can:
• Create buyer profile
• Browse available produce
• Search by crop
• Search by quantity
• View farmer listings
• Submit purchase requests
• Confirm orders
• Track deliveries
• Confirm received quantity
5.4 Processor
Processors can purchase agricultural produce for processing.
Examples:
• Tomato → puree/sauce
• Potato → chips/starch
• Fruits → juice/pulp
• Grains → flour
Processors can:
• Create processor profile
• List requirements
• Browse available produce• Submit purchase requests
• Manage processing orders
• Confirm received quantities
5.5 Administrator
Administrators manage the platform.
Admin capabilities:
• Manage users
• Verify users
• Verify transporters
• Monitor transactions
• Manage market data
• Monitor system activity
• Manage reported issues
• View platform analytics
• Manage agricultural reference data
6. Core Product Architecture
SASYAM consists of six major product domains.
SASYAM
│
┌──────────────────┼──────────────────┐
│ │ │
▼ ▼ ▼
FARMING POST-HARVEST MARKETPLACE
INTELLIGENCE MANAGEMENT INTELLIGENCE
│ │ │
└──────────────────┼──────────────────┘│ ▼
AI DECISION
ENGINE
│
┌────────────┼────────────┐
▼ ▼ ▼
LOGISTICS PROCESSING ALERTS
│ │ │
└────────────┼────────────┘
▼
TRANSACTION
│ ▼
BUYER
7. Core User Journey
The primary SASYAM journey should be:
Farmer Registration
↓
Create Farm
↓
Add Field
↓
Enter Soil / Water / Location Data
↓
AI Crop Recommendation
↓Cultivation
↓
Disease Detection / Farm Alerts
↓
Harvest
↓
Create Produce Inventory
↓
Market + Storage + Processing Analysis
↓
Selling Decision
↓
Select Buyer / Market
↓
Request Transportation
↓
Transporter Matching
↓
Transport Booking
↓
Live Tracking
↓
Delivery
↓
Buyer Confirmation
↓
Transaction Completed
This end-to-end journey should be the central demonstration flow for the MVP.8. Module 1 — Farmer & Farm Management
8.1 Registration
Users should be able to register using:
• Mobile number
• Email
• Password
Optional future authentication:
• OTP
• Government identity verification
8.2 Login
Users can log in using:
• Mobile/email
• Password
Authentication should use:
• JWT
• Secure password hashing
9. Farm Profile
A farmer can create one or more farms.
Farm attributes
• Farm name
• Location
• Latitude
• Longitude
• Total area
• Soil type
• Irrigation availability• Water source
• Farming type
• Previous crops
Acceptance Criteria
A farmer should be able to:
• Create a farm.
• Edit farm details.
• View farm details.
• Add multiple fields.
• Associate crops with fields.
10. Module 2 — AI Crop & Farm Advisor
10.1 Objective
Help farmers determine which crops may be suitable based on available information.
The existing concept defines inputs such as location, land area, soil type, irrigation
availability, previous crop, and season.
10.2 Inputs
Location
Land Area
Soil Type
Water Availability
Previous Crop
Current Season
Potential additional inputs:
• Temperature
• Rainfall
• Historical crop performance
• Current market prices• Expected demand
These factors are part of the proposed recommendation logic.
10.3 Output
The system should provide:
Recommended Crops
1. Wheat
Suitability: 91%
2. Mustard
Suitability: 84%
3. Chickpea
Suitability: 78%
For each recommendation:
• Crop name
• Suitability score
• Expected growing period
• Water requirement
• Basic risk factors
• Expected market potential
• Explanation
10.4 Explainability
The recommendation should explain:
"Wheat is recommended because your soil type, water availability, season, and
historical conditions are suitable."
The system should avoid presenting AI recommendations as unquestionable facts.11. Module 3 — AI Disease Detection
11.1 Objective
Allow farmers to upload an image of a crop or leaf and receive an AI-assisted disease
assessment.
The proposed workflow is:
Upload Image
↓
Image Validation
↓
AI Classification
↓
Disease Prediction
↓
Confidence Score
↓
Recommended Action
The concept specifically proposes disease name, confidence, possible causes,
preventive measures, and next steps.
11.2 Input
• Crop
• Leaf/crop image
11.3 Output
Possible Disease
Leaf Blight
Confidence
94%
Possible Causes...
Recommended Actions
...
Preventive Measures
...
11.4 Safety Requirement
If confidence is below an acceptable threshold, the system should say:
"The result is uncertain. Consider consulting an agricultural expert."
The model must not claim certainty when the image classification is unreliable.
12. Module 4 — Harvest Management
Farmers should be able to record harvests.
12.1 Harvest Record
Fields:
• Crop
• Field
• Harvest date
• Quantity
• Unit
• Quality/grade
• Storage condition
• Current location
• Intended destination
Example:
Crop: Tomato
Quantity: 1,500 kgHarvest Date: 5 September
Storage: Open
Quality: Grade A
13. Module 5 — Produce Inventory
Every harvested batch should become an inventory item.
13.1 Produce Batch
ProduceBatch
│
├── Crop
├── Quantity
├── Harvest Date
├── Quality
├── Storage Location
├── Storage Condition
├── Current Status
└── Expected Shelf Life
13.2 Inventory Status
Possible statuses:
HARVESTED
AVAILABLE
RESERVED
SOLD
IN_TRANSIT
DELIVERED
PROCESSED
SPOILED14. Module 6 — Post-Harvest Intelligence
This module directly addresses post-harvest management and agricultural produce
handling.
The proposed system estimates freshness/spoilage risk and provides a safe selling
window.
14.1 Inputs
• Crop
• Quantity
• Harvest date
• Storage type
• Temperature
• Humidity
• Storage location
• Expected shelf life
14.2 Output
Example:
Freshness Risk
72%
Estimated Safe Selling Window
2–3 Days
Recommendation
Sell within 48 hours
or move to cold storage.15. Future IoT Integration
The system should be designed so that storage data can later come from sensors.
Potential sensors:
• Temperature
• Humidity
• Storage environment
Future flow:
IoT Sensor
↓
Gateway
↓
SASYAM Backend
↓
Storage Monitoring
↓
Spoilage Risk Model
↓
Alert
IoT should be considered a future enhancement rather than a mandatory MVP
dependency.
16. Module 7 — Market Intelligence
16.1 Objective
SASYAM should not simply display market prices.
It should answer:
"Where should I sell?"
and:
"Should I sell now or wait?"The product concept explicitly defines this decision-oriented market approach.
17. Market Comparison
For each relevant market, show:
• Market
• Current price
• Distance
• Transportation cost
• Estimated net price
• Demand indicator
• Price trend
Example:
Tomato
Local Mandi
₹24/kg
Azadpur
₹27/kg
Market B
₹29/kg
Transport Cost
₹3/kg
Expected Net Price
₹26/kgRecommendation
SELL AT MARKET B
18. Net Realization Engine
The core calculation should be:
Net Realization
=
Selling Price
− Transportation Cost
− Storage Cost
− Processing Cost
− Other Applicable Costs
The source concept explicitly identifies transportation, storage, and other costs as
factors in net revenue.
For quantity-based calculations:
Expected Revenue
=
Net Price × Quantity
Example:
Selling Price = ₹29/kg
Transport = ₹3/kg
Storage = ₹0/kg
Other Cost = ₹1/kg
Net Price = ₹25/kg
Quantity = 1,500 kgExpected Net Revenue
= ₹37,500
19. Module 8 — "Sell Now or Wait?" Decision Engine
This should be the primary AI/business-intelligence feature of SASYAM.
The decision engine evaluates:
• Current market price
• Historical price trend
• Expected future price
• Demand
• Weather
• Transportation cost
• Storage cost
• Expected spoilage
• Storage capacity
These factors form the proposed selling-decision logic.
19.1 Example
ONION
Current Price
₹22/kg
Expected Price in 5 Days
₹25/kg
Storage Cost
₹1.2/kgSpoilage Risk
8%
Recommendation
STORE FOR 3–5 DAYS
Expected Additional Profit
₹3,600
Alternative:
SELL NOW
Expected price increase is insufficient
to compensate for:
• Storage cost
• Spoilage risk
• Transport cost
20. Decision Engine Output
The system should provide:
Recommendation
One of:
SELL NOW
STORE
PROCESS
SELL TO ALTERNATIVE MARKETConfidence
Example:
Recommendation Confidence: 82%
Explanation
The system should explain why.
Example:
"Storing for three days may increase expected realization, but the benefit is reduced by
storage cost and spoilage risk."
21. Module 9 — Agriculture Marketplace
The marketplace connects farmers with:
• Wholesalers
• Retailers
• Restaurants
• Processors
• Cooperatives
• Local businesses
The proposed marketplace allows farmers to compare buyer offers and choose based
on net realization rather than only quoted price.
22. Farmer Listing
A farmer can create a produce listing.
Listing fields
Crop
Quantity
Quality
Expected Price
Minimum Acceptable Price
Harvest DateAvailable From
Location
Expiry/Selling Window
23. Buyer Search
Buyers should be able to search by:
• Crop
• Quantity
• Location
• Quality
• Price
• Availability
Example:
Tomato
Available:
1,000 kg
Location:
Jaunpur
Grade:
A
Expected Price:
₹25/kg
24. Buyer OffersA buyer can submit:
Requested Quantity
Offered Price
Pickup/Delivery Preference
Required Date
The farmer can:
• Accept
• Reject
• Counter-offer
25. Module 10 — Processing Marketplace
SASYAM should also connect farmers with processors.
Example:
1,000 kg Tomatoes
│
├──────────────┐
│ │
▼ ▼
Fresh Market Processing
600 kg 400 kg
│
┌──────┼──────┐
▼ ▼ ▼
Puree Sauce Dried
The concept proposes using processing partners as an alternative to selling all produce
fresh.
26. Processing RecommendationThe decision engine may compare:
Fresh Sale Revenue
vs
Processing Revenue
Factors:
• Current market price
• Processing cost
• Processing partner capacity
• Expected processed-product value
• Quantity
• Quality
• Spoilage risk
Output:
Recommended Allocation
600 kg → Fresh Market
400 kg → Processing Partner
27. Module 11 — Transport Marketplace
Farmers should be able to request transportation.
27.1 Transport Request
Produce:
Potato
Quantity:
1,500 kg
Pickup:Farm
Destination:
Mandi
Required:
Tomorrow
28. Transporter Matching Engine
The system searches available transporters based on:
• Vehicle capacity
• Distance
• Price
• Availability
• ETA
• Vehicle type
• Route compatibility
• Reliability/history
The proposed product concept specifically identifies searching available transporters,
calculating distance, comparing prices, and route optimization.
29. Transport Recommendation
Example:
AVAILABLE VEHICLES
Truck A
Capacity: 2,000 kg
Price: ₹3,200ETA: 2 hr
Truck B
Capacity: 1,500 kg
Price: ₹2,800
ETA: 3 hr
Truck C
Capacity: 3,000 kg
Price: ₹3,600
ETA: 1 hr
SASYAM Recommendation
Truck B — Best Value
30. Transport Booking
Once the farmer selects a transporter:
Transport Request
↓
Transporter Accepts
↓
Booking Created
↓
Pickup Scheduled
↓
Produce Picked Up
↓IN TRANSIT
↓
Destination Reached
↓
Delivered
31. Module 12 — Live Transportation Tracking
Once a delivery begins, the farmer should be able to view live transport status.
The existing concept proposes Socket.IO/WebSockets for real-time location updates.
31.1 Transport States
REQUESTED
ACCEPTED
DRIVER_ASSIGNED
EN_ROUTE_TO_PICKUP
ARRIVED_AT_PICKUP
PICKED_UP
IN_TRANSIT
ARRIVED_AT_DESTINATION
DELIVERED
CANCELLED
31.2 Live Tracking
Example:
Transporter: Raj Logistics
Status:
Picked Up
Current Location:3.2 km away
ETA:
24 minutes
32. Real-Time Architecture
Transporter Device
│
│ GPS
▼
Socket.IO / WebSocket
│ ▼
FastAPI
│
├── Redis
│ ▼
Farmer Dashboard
The frontend should update the transport location without requiring a manual page
refresh.
33. Module 13 — Notifications
SASYAM should provide event-driven notifications.
The proposed system includes weather, market, transportation, storage, and delivery
follow-up notifications.
33.1 Notification Categories
Weather
Heavy rainfall expected tomorrow. Consider harvesting your mature crop today.Market
Tomato prices increased 12% in Market B.
Transport
Your transporter is 15 minutes away.
Storage
Your stored produce has a high spoilage risk.
Delivery
Your produce delivery was completed. Please confirm quantity received.
34. Notification Channels
SASYAM can support:
• In-app notifications
• Push notifications
• SMS
• WhatsApp
For MVP, notification infrastructure should be abstracted behind a common notification
service.
NotificationService
│
├── Push
├── SMS
└── WhatsApp
35. Automatic Reminder Engine
Background jobs should generate reminders for:
• Upcoming harvest
• Expected spoilage
• Pending buyer response• Pending transport confirmation
• Upcoming pickup
• Delivery confirmation
• Unconfirmed orders
Example:
Harvest Reminder
Your wheat harvest is approaching.
Review your market and transport options.
36. Module 14 — Transaction Management
SASYAM should maintain a transaction lifecycle.
Buyer Request
↓
Farmer Accepts
↓
Order Created
↓
Transport Booked
↓
Produce Picked Up
↓
Delivered
↓
Buyer Confirms Quantity
↓
Transaction Completed
Transaction information:• Buyer
• Farmer
• Produce
• Quantity
• Price
• Total value
• Transport cost
• Other costs
• Net realization
• Status
• Created date
• Delivery date
37. User Dashboard Requirements
37.1 Farmer Dashboard
The dashboard should show:
Overview
• Active crops
• Upcoming harvests
• Current produce inventory
• Market opportunities
• Active transport
• Alerts
Quick Actions
+ Add Farm
+ Add Crop
+ Scan Disease
+ Record Harvest+ Sell Produce
+ Request Transport
Intelligence Cards
Crop Recommendation
Market Opportunity
Storage Risk
Selling Recommendation
Transport Status
38. Transporter Dashboard
Display:
• Available requests
• Accepted jobs
• Active delivery
• Vehicle information
• Earnings/transactions
• Delivery history
Quick actions:
View Requests
Accept Job
Start Delivery
Update Status
Share Location
Complete Delivery
39. Buyer Dashboard
Display:
• Available produce• Active orders
• Pending requests
• Deliveries
• Purchase history
Quick actions:
Search Produce
Make Offer
Track Delivery
Confirm Delivery
40. Processor Dashboard
Display:
• Available produce
• Processing requirements
• Active orders
• Incoming deliveries
• Processing inventory
41. Admin Dashboard
Display:
• Total users
• Farmers
• Buyers
• Transporters
• Processors
• Active listings
• Transactions
• Deliveries• System alerts
Administrative functions:
• User verification
• Transporter verification
• Buyer verification
• Listing moderation
• Transaction monitoring
• Data management
42. AI Decision Engine
SASYAM should have a centralized decision engine.
AI DECISION ENGINE
│
┌───────────────────┼───────────────────┐
│ │ │
▼ ▼ ▼
Crop Recommendation Market Decision Post-Harvest
│ │ │
▼ ▼ ▼
Crop Score Sell/Wait/Market Spoilage Risk
│ ▼
Processing Option
The engine should not necessarily be a single ML model.
It can combine:
• Rules
• Statistical models
• ML models• Optimization
• External data
• Historical data
43. AI Architecture
Crop Recommendation
Farm Data
+
Weather
+
Soil
+
Historical Data
+
Market Data
↓
Recommendation Engine
↓
Ranked Crops
Disease Detection
Image
↓
Computer Vision Model
↓
Disease Classification
↓
Confidence
↓Recommendation
Selling Decision
Current Price
Historical Price
Demand
Weather
Storage Cost
Transport Cost
Spoilage Risk
↓
Decision Engine
↓
SELL / STORE / PROCESS
44. Data Architecture
The core database should use PostgreSQL.
Major Entities
User
FarmerProfile
TransporterProfile
BuyerProfile
ProcessorProfile
Farm
Field
Crop
CropCycle
HarvestProduceBatch
Storage
Market
MarketPrice
BuyerListing
PurchaseOrder
Offer
Vehicle
TransportRequest
TransportBooking
LocationUpdate
Notification
Transaction
DiseasePrediction
Recommendation
ProcessingOption
45. Simplified Database Relationships
User
│
├──── Farmer ──── Farm ──── Field
│ │
│ └── Crop Cycle│ │
│ └── Harvest
│ │
│ └── Produce Batch
│ │
│ ┌──────────────────────────┼──────────────┐
│ │ │ │
│ ▼ ▼ ▼
│ Market Buyer Processor
│ │ │ │
│ ▼ ▼ ▼
│ Market Price Order Processing Order
│ │
│ ▼
│ Transport Request
│ │
│ ▼
│ Transporter
│ │
│ ▼
│ Vehicle
46. Backend Technology
Recommended backend:
• Python
• FastAPI
• Pydantic
• SQLAlchemy / SQLModel• PostgreSQL
• Alembic
• JWT
• Bcrypt
The proposed technology stack already identifies FastAPI, Python,
SQLAlchemy/SQLModel, Pydantic, Alembic, PostgreSQL, JWT and Bcrypt.
47. Backend Service Architecture
FastAPI
│
├── Authentication
├── Users
├── Farms
├── Crops
├── Harvest
├── Inventory
├── Markets
├── Marketplace
├── Transportation
├── Tracking
├── Notifications
├── AI
└── Transactions
48. Background Processing
Use:
• Celery
• RedisThe proposed architecture uses Redis and Celery for background jobs such as alerts,
market data processing, and notifications.
Background tasks include:
Market Data Updates
Weather Processing
Price Analysis
Spoilage Risk Calculation
Automatic Reminders
Notification Delivery
Recommendation Generation
Data Cleanup
49. Real-Time Layer
Use:
• Socket.IO
• WebSockets
• Redis where required
Primary use case:
Live transporter location.
Future use cases:
• Live order updates
• Buyer offer notifications
• Delivery status
• Real-time marketplace events
50. Frontend Technology
Recommended:
• React• TypeScript
• Tailwind CSS
• Recharts
• Framer Motion
These technologies align with the proposed SASYAM stack.
51. Frontend Application Structure
src/
│
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── api/
├── types/
├── utils/
├── contexts/
└── features/
├── auth/
├── farms/
├── crops/
├── harvest/
├── marketplace/
├── transportation/
├── tracking/
└── notifications/52. API Design
Example REST API structure:
Authentication
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
Farms
GET /farms
POST /farms
GET /farms/{farm_id}
PATCH /farms/{farm_id}
DELETE /farms/{farm_id}
Fields
GET /farms/{farm_id}/fields
POST /farms/{farm_id}/fields
Crop Recommendations
POST /ai/crop-recommendation
GET /recommendations
GET /recommendations/{id}
Disease Detection
POST /ai/disease-detection
GET /disease-results/{id}
Harvest
POST /harvests
GET /harvests
GET /harvests/{id}Produce
GET /produce
POST /produce
PATCH /produce/{id}
Market
GET /markets
GET /markets/{market_id}/prices
GET /market-analysis
Selling Decision
POST /ai/selling-decision
Marketplace
GET /listings
POST /listings
GET /listings/{id}
POST /listings/{id}/offers
PATCH /offers/{id}
Transportation
POST /transport/requests
GET /transport/requests
POST /transport/requests/{id}/accept
POST /transport/bookings
GET /transport/bookings/{id}
Tracking
WebSocket /ws/tracking/{booking_id}
Notifications
GET /notifications
PATCH /notifications/{id}/read53. Security Requirements
SASYAM must implement:
• Password hashing
• JWT authentication
• Role-based authorization
• Input validation
• API authentication
• Rate limiting where appropriate
• Secure file upload validation
• Access control
• HTTPS in production
• Audit logging for important operations
Users should only access resources they are authorized to access.
Example:
A farmer should not be able to modify another farmer's produce inventory.
54. Image Upload Security
For disease detection:
• Restrict file types
• Restrict file size
• Validate MIME type
• Generate unique filenames
• Store files securely
• Prevent executable uploads
• Optionally scan uploaded files
55. Non-Functional Requirements
PerformanceNormal API requests should ideally respond within a few hundred milliseconds under
normal conditions.
AI operations may take longer and should support asynchronous processing where
required.
Availability
The production platform should be designed for high availability.
Scalability
The architecture should allow independent scaling of:
• API servers
• AI services
• Background workers
• Real-time services
Reliability
Critical transaction state changes should be persistent and recoverable.
56. Observability
The backend should provide:
• Application logs
• Error logs
• Request logging
• Background task monitoring
• Database monitoring
• API performance metrics
Future:
• Centralized logging
• Distributed tracing
• Application monitoring
57. LocalizationBecause SASYAM targets farmers, the interface should eventually support regional
languages.
Potential languages:
• Hindi
• English
• Other regional languages
The architecture should keep user-facing text separate from business logic so
localization can be added later.
58. Accessibility & Usability
The farmer interface should prioritize:
• Large buttons
• Simple language
• Clear icons
• Minimal navigation
• Mobile-first design
• High readability
• Visual status indicators
• Simple forms
Avoid overwhelming farmers with technical AI terminology.
Instead of:
"Prediction probability: 0.91"
prefer:
"High confidence — 91%"
59. MVP Scope
The MVP should NOT attempt to implement every proposed feature at production scale.
The strongest MVP should demonstrate one complete farm-to-market journey.
MVP Feature SetMust Have
1. Authentication
2. Farmer profile
3. Farm management
4. Crop management
5. AI crop recommendation
6. Harvest recording
7. Produce inventory
8. Market price comparison
9. Net realization calculation
10. Sell/Store/Process recommendation
11. Marketplace listing
12. Buyer interaction
13. Transport request
14. Transporter dashboard
15. Transport booking
16. Live tracking
17. Notifications
60. MVP Demonstration Scenario
The entire SIH demonstration should follow one farmer.
FARMER
↓
Creates Farm
↓
Adds Soil + Water Information
↓
SASYAM Recommends Crop↓
Farmer Cultivates
↓
Disease Detected
↓
Crop Harvested
↓
Farmer Records 1,500 kg Produce
↓
SASYAM Checks Market
↓
SASYAM Checks Storage Risk
↓
SASYAM Checks Processing Option
↓
SELL NOW / STORE / PROCESS
↓
Farmer Selects Buyer
↓
SASYAM Calculates Net Realization
↓
Farmer Requests Transport
↓
SASYAM Finds Best Transporter
↓
Transporter Accepts
↓
Live GPS Tracking↓
Buyer Receives Produce
↓
Delivery Confirmed
This creates the strongest possible demonstration because it shows SASYAM as an endto-end agricultural supply-chain platform, rather than a collection of unrelated AI
features.
61. MVP Priority Matrix
Feature Priority MVP
Authentication P0 Yes
Farmer/Farm Management P0 Yes
Crop Recommendation P0 Yes
Disease Detection P1 Yes
Harvest Management P0 Yes
Produce Inventory P0 Yes
Market Prices P0 Yes
Net Realization P0 Yes
Sell/Store/Process P0 Yes
Marketplace P0 Yes
Transport Matching P0 Yes
Live Tracking P0 Yes
Notifications P1 Yes
Processing Marketplace P1 Basic
IoT Storage Sensors P2 No
Advanced Route Optimization P2 NoFeature Priority MVP
Advanced ML Forecasting P2 No
Payment Gateway P2 Optional
Multilingual Voice Assistant P2 Future
62. Future Features
After the MVP, SASYAM can evolve into a larger agricultural ecosystem.
Phase 2
• Weather integration
• Advanced price forecasting
• Regional language support
• Voice-based farmer assistant
• Better buyer discovery
• Ratings and reviews
• Digital invoices
Phase 3
• IoT storage monitoring
• Advanced demand prediction
• Route optimization
• Warehouse integration
• Cold-chain integration
• Processing optimization
Phase 4
• Digital payments
• Insurance integration
• Credit/finance integrations
• Government scheme discovery• Cooperative integration
• Large-scale supply-chain analytics
63. Success Metrics
The product should measure both platform activity and agricultural outcomes.
User Metrics
• Registered farmers
• Active farmers
• Active buyers
• Active transporters
• Active processors
Engagement
• Recommendations generated
• Disease scans
• Market analyses
• Produce listings
• Transport requests
• Completed transactions
Business/Supply-Chain Metrics
• Average net realization
• Average transportation cost
• Produce sold through marketplace
• Successful deliveries
• Time from harvest to sale
• Quantity successfully matched with buyers
Waste Reduction
Potential future metric:
Estimated Produce Saved=
Produce that avoided spoilage
64. Key Product KPIs
The most important KPIs should be:
1. Farmer Decision Improvement
Percentage of recommendations acted upon.
2. Net Realization Improvement
Difference between farmer's baseline selling realization and SASYAM-assisted
realization.
3. Post-Harvest Loss Reduction
Estimated reduction in produce lost to spoilage.
4. Marketplace Match Rate
Successful Matches
÷
Total Listings
5. Transport Fulfillment Rate
Completed Transport Bookings
÷
Total Transport Requests
6. Delivery Success Rate
Successful Deliveries
÷
Total Deliveries
65. Risks
AI Accuracy Risk
Disease detection and crop recommendations may be inaccurate.Mitigation
• Confidence scores
• Explainability
• Human expert escalation
• Conservative recommendations
Market Data Risk
Market prices can change quickly.
Mitigation
• Timestamp market data
• Show data freshness
• Avoid guaranteed price predictions
Connectivity Risk
Rural connectivity may be unreliable.
Mitigation
Future support for:
• Offline caching
• SMS alerts
• Low-bandwidth UI
• Retry mechanisms
GPS Accuracy Risk
Transport location may be inaccurate.
Mitigation
• Show approximate location
• Timestamp updates
• Display last updated timeAdoption Risk
Farmers may not immediately trust AI recommendations.
Mitigation
Every recommendation should answer:
Why is SASYAM recommending this?
66. Product Principles
SASYAM should follow five principles.
1. Action Over Information
Don't just show data.
Convert data into decisions.
Price Data
↓
Market Analysis
↓
SELL HERE
2. Explainable AI
Every important AI recommendation should provide a reason.
3. Farmer First
The farmer should not need to understand:
• ML
• APIs
• algorithms
• databases
They should simply understand:"What should I do next?"
4. End-to-End Thinking
The platform should connect:
Farm
↓
Crop
↓
Harvest
↓
Produce
↓
Market
↓
Buyer
↓
Transport
↓
Delivery
5. Net Value Over Individual Prices
The highest quoted price is not always the best option.
SASYAM should optimize for:
Expected Net Realization
rather than simply:
Highest Market Price
67. Recommended System ArchitectureReact + TypeScript
│ ▼
┌─────────────────┐
│ Frontend │
│ Dashboard │
└────────┬────────┘
│
REST / WebSocket
│ ▼
┌─────────────────┐
│ FastAPI │
│ API Gateway │
└────────┬────────┘
│
┌────────────────────────┼────────────────────────┐
│ │ │
▼ ▼ ▼
PostgreSQL Redis AI Services
│ │ │
│ │ ┌─────────┴─────────┐
│ │ │ │
▼ ▼ ▼ ▼
Farm Data Background Jobs Disease AI Decision Engine
Crop Data Celery
Market Data │
Orders ├── AlertsUsers ├── Notifications
Transport ├── Market Analysis
└── Recommendations
│ ▼
External Services
│
├── Weather
├── Market Data
├── Maps
├── SMS
├── WhatsApp
└── Push Notifications
The proposed architecture aligns with the original SASYAM architecture: React
dashboard, FastAPI backend, PostgreSQL, Redis, AI services, Celery, alerts, market
data, and notifications.
68. Recommended Development Phases
Phase 1 — Backend Foundation
Build:
• FastAPI project
• PostgreSQL
• SQLAlchemy/SQLModel
• Alembic
• JWT authentication
• Bcrypt
• User rolesPhase 2 — Farm Management
Build:
• Farmer profile
• Farm
• Field
• Crop
• Crop cycle
• Harvest
Phase 3 — Produce & Market
Build:
• Produce inventory
• Market
• Market prices
• Market comparison
• Net realization engine
Phase 4 — AI
Build:
• Crop recommendation
• Disease detection
• Selling decision engine
• Storage/spoilage logic
Phase 5 — Marketplace
Build:
• Produce listings
• Buyer search• Offers
• Orders
• Processor listings
Phase 6 — Logistics
Build:
• Transporter profiles
• Vehicles
• Transport requests
• Matching
• Booking
• Delivery states
Phase 7 — Real-Time Tracking
Build:
• Socket.IO/WebSocket server
• GPS updates
• Redis
• Live map
• ETA
• Delivery status
Phase 8 — Notifications
Build:
• Notification service
• Celery
• Redis
• Push• SMS
• WhatsApp integration
Phase 9 — Frontend Integration
Connect all backend modules to:
• Farmer dashboard
• Transporter dashboard
• Buyer dashboard
• Processor dashboard
• Admin dashboard
69. Definition of Done
A feature is considered complete when:
1. Database model exists.
2. Migration exists.
3. Backend API exists.
4. Authentication/authorization is implemented.
5. Input validation exists.
6. Error handling exists.
7. API is tested.
8. Frontend UI exists.
9. Frontend is connected to the API.
10. Loading/error states are handled.
11. Relevant notifications are implemented.
12. Feature works in the complete user flow.
70. Final Product Definition
SASYAM should ultimately be understood as:An AI-powered farm-to-market intelligence platform that helps farmers decide
what to grow, how to manage their crops, when to harvest, how to manage
harvested produce, where to sell, whether to sell or store or process, how to
transport it, and how to track the journey until delivery.
The platform's complete flow is:
SASYAM
│ ▼
WHAT TO GROW?
│ ▼
HOW TO GROW?
│ ▼
DISEASE RISK?
│ ▼
WHEN TO HARVEST?
│ ▼
MANAGE PRODUCE
│
┌─────────┼─────────┐
▼ ▼ ▼
SELL STORE PROCESS
│ │ │
└─────────┼─────────┘
▼
WHERE TO SELL?│ ▼
WHICH BUYER?
│ ▼
WHICH TRANSPORT?
│ ▼
LIVE TRACKING
│ ▼
DELIVERY
│ ▼
PAYMENT
71. Core Differentiator
SASYAM should NOT be positioned as:
"An AI app for farmers."
Instead, the product positioning should be:
"SASYAM is an AI-powered farm-to-market intelligence platform that helps farmers
decide what to grow, when to harvest, where to sell, whether to store or process,
and how to transport their produce."
This is the strongest positioning because it connects the agricultural lifecycle instead of
solving only one isolated problem.
72. SIH Problem-to-Solution MappingSIH Requirement SASYAM Solution
Enhance agriculture AI crop & farm recommendations
Improve farmer decisions AI decision engine
Manage agricultural produce Harvest & inventory management
Process agricultural produce Processing recommendations + processor marketplace
Reduce wastage Shelf-life/spoilage intelligence
Improve market access Digital marketplace
Better price realization Market comparison + net realization
Improve logistics Transporter matching
Supply-chain coordination Farm → Transporter → Buyer
Digital agricultural ecosystem Unified SASYAM platform
This mapping follows the original project concept.
73. The "Golden Path" for the SIH Prototype
If development time becomes limited, prioritize this exact flow:
LOGIN
↓
FARM PROFILE
↓
CROP RECOMMENDATION
↓
HARVEST
↓
PRODUCE INVENTORY
↓
MARKET ANALYSIS↓
STORAGE / PROCESSING ANALYSIS
↓
SELLING DECISION
↓
BUYER
↓
TRANSPORTER MATCH
↓
TRANSPORT BOOKING
↓
LIVE TRACKING
↓
DELIVERY
The original concept similarly recommends building a strong working MVP around the
farmer → crop → harvest → produce → market/storage/processing → selling decision →
buyer → transporter → live tracking → delivery flow.
74. Final Product Statement
SASYAM
From Seed to Sale. Intelligence at Every Step.
SASYAM transforms agricultural decision-making from fragmented information into a
connected, intelligent workflow.
Instead of asking only:
"How do I grow my crop?"
SASYAM helps answer:
"What should I grow?"
"How should I manage it?"
"When should I harvest?"
"What should I do with my harvested produce?""Where will I get the best net realization?"
"Should I sell, store, or process?"
"Which buyer should I choose?"
"How should I transport it?"
"Where is my produce right now?"
That is the core product vision of SASYAM.