import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import {
  Upload,
  Play,
  Download,
  AlertTriangle,
  TrendingUp,
  Ship,
  Truck,
  Clock,
  DollarSign,
  Package,
  Users,
  Settings,
  FileText,
  BarChart3,
  Calendar,
  Zap
} from 'lucide-react';

const LogisticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedData, setUploadedData] = useState(null);
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [scenarioData, setScenarioData] = useState({
    vesselETA: '',
    rakeAvailability: 85,
    demurrageCost: 15000,
    freightRate: 1.2
  });

  // Sample KPI data
  const kpiData = {
    totalCost: 2450000,
    costBreakdown: [
      { name: 'Ocean Freight', value: 1200000, color: '#1e40af' },
      { name: 'Rail Transport', value: 680000, color: '#3b82f6' },
      { name: 'Port Handling', value: 320000, color: '#60a5fa' },
      { name: 'Demurrage', value: 250000, color: '#93c5fd' }
    ],
    stockUtilization: 78,
    dispatchCompliance: 92
  };

  // Sample vessel schedule data for Gantt chart
  const vesselSchedule = [
    { vessel: 'MV Steel Carrier 1', port: 'Plant A', start: 1, duration: 3, type: 'loading' },
    { vessel: 'MV Steel Carrier 1', port: 'Plant B', start: 5, duration: 2, type: 'discharge' },
    { vessel: 'MV Bulk Master', port: 'Plant C', start: 2, duration: 4, type: 'loading' },
    { vessel: 'MV Ocean Spirit', port: 'Plant A', start: 7, duration: 3, type: 'loading' }
  ];

  // Sample AI predictions data
  const delayPredictions = [
    { port: 'Port A', predictedDelay: 2.5, confidence: 85, risk: 'medium' },
    { port: 'Port B', predictedDelay: 0.8, confidence: 92, risk: 'low' },
    { port: 'Port C', predictedDelay: 4.2, confidence: 78, risk: 'high' }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedData(file.name);
    }
  };

  const runOptimization = () => {
    // Simulate optimization results
    setOptimizationResults({
      costSaving: 180000,
      newTotalCost: 2270000,
      efficiency: 94,
      vessels: [
        { name: 'MV Steel Carrier 1', route: 'Port A → Port B', cost: 450000, utilization: 96 },
        { name: 'MV Bulk Master', route: 'Port C → Plant Direct', cost: 380000, utilization: 89 }
      ]
    });
  };

  const handleScenarioChange = (field, value) => {
    setScenarioData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'input', name: 'Data Input', icon: Upload },
    { id: 'optimization', name: 'Optimization', icon: Zap },
    { id: 'predictions', name: 'AI Predictions', icon: TrendingUp },
    { id: 'scenarios', name: 'What-If Analysis', icon: Settings },
    { id: 'reports', name: 'Reports', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Ship className="h-8 w-8 text-blue-200" />
              <div>
                <h1 className="text-2xl font-bold">Steel Plant Logistics Optimization</h1>
                <p className="text-blue-200">Supply Chain Decision Support System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-blue-800 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live Data</span>
              </div>
              <button className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
                <Users className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-blue-100 shadow-sm">
        <div className="px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Transport Cost</p>
                    <p className="text-2xl font-bold text-blue-900">${kpiData.totalCost.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Stock Utilization</p>
                    <p className="text-2xl font-bold text-green-600">{kpiData.stockUtilization}%</p>
                  </div>
                  <Package className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Dispatch Compliance</p>
                    <p className="text-2xl font-bold text-blue-600">{kpiData.dispatchCompliance}%</p>
                  </div>
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Alerts</p>
                    <p className="text-2xl font-bold text-orange-600">3</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cost Breakdown */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Cost Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={kpiData.costBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {kpiData.costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {kpiData.costBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">${item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vessel Schedule */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Vessel Schedule</h3>
                <div className="space-y-3">
                  {vesselSchedule.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-32 text-xs text-gray-600 truncate">{item.vessel}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-4 relative">
                        <div
                          className={`absolute h-4 rounded-full ${
                            item.type === 'loading' ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                          style={{
                            left: `${(item.start / 10) * 100}%`,
                            width: `${(item.duration / 10) * 100}%`
                          }}
                        ></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">{item.port}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Loading</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Discharge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Input */}
        {activeTab === 'input' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Data Integration</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* File Upload */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Upload STEM Data</h4>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                    <div className="space-y-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileUpload}
                          accept=".xlsx,.xls,.csv"
                        />
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Choose File
                        </span>
                      </label>
                      <p className="text-sm text-gray-500">Excel or CSV format</p>
                      {uploadedData && (
                        <p className="text-sm text-green-600">✓ {uploadedData} uploaded successfully</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* SAP Integration */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">SAP Integration</h4>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm">Connection Status</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Connected</span>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Sync Latest Data
                    </button>
                  </div>
                </div>
              </div>

              {/* Manual Input */}
              <div className="mt-8">
                <h4 className="font-medium text-gray-700 mb-4">Manual Input</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Vessel Name"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Parcel Size (MT)"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Optimization */}
        {activeTab === 'optimization' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Optimization Engine</h3>
                <button
                  onClick={runOptimization}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  <span>Run Optimization</span>
                </button>
              </div>

              {optimizationResults ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          ${optimizationResults.costSaving.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-700">Cost Savings</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          ${optimizationResults.newTotalCost.toLocaleString()}
                        </p>
                        <p className="text-sm text-blue-700">Optimized Total Cost</p>
                      </div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{optimizationResults.efficiency}%</p>
                        <p className="text-sm text-purple-700">Efficiency Score</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Optimized Vessel Routes</h4>
                    <div className="space-y-3">
                      {optimizationResults.vessels.map((vessel, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-800">{vessel.name}</h5>
                              <p className="text-sm text-gray-600">{vessel.route}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-blue-600">${vessel.cost.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">{vessel.utilization}% utilization</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Click "Run Optimization" to calculate the best routes and cost savings
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI Predictions */}
        {activeTab === 'predictions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">AI Delay Predictions</h3>
              <div className="space-y-4">
                {delayPredictions.map((prediction, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${
                      prediction.risk === 'high'
                        ? 'border-red-200 bg-red-50'
                        : prediction.risk === 'medium'
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-green-200 bg-green-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{prediction.port}</h4>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          prediction.risk === 'high'
                            ? 'bg-red-100 text-red-700'
                            : prediction.risk === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {prediction.risk.toUpperCase()} RISK
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        Predicted Delay:{' '}
                        <span className="font-medium text-blue-600">
                          {prediction.predictedDelay} days
                        </span>
                      </div>
                      <div>
                        Model Confidence:{' '}
                        <span className="font-medium text-gray-700">
                          {prediction.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scenario / What-If */}
        {activeTab === 'scenarios' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">What-If Analysis</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vessel ETA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vessel ETA</label>
                  <input
                    type="date"
                    value={scenarioData.vesselETA}
                    onChange={(e) => handleScenarioChange('vesselETA', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Rake Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rake Availability (%)
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="1"
                    value={scenarioData.rakeAvailability}
                    onChange={(e) =>
                      handleScenarioChange('rakeAvailability', parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-sm mt-1 text-gray-600">{scenarioData.rakeAvailability}%</p>
                </div>

                {/* Demurrage Cost */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Demurrage Cost ($/day)
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="30000"
                    step="1000"
                    value={scenarioData.demurrageCost}
                    onChange={(e) =>
                      handleScenarioChange('demurrageCost', parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-sm mt-1 text-gray-600">${scenarioData.demurrageCost}</p>
                </div>

                {/* Freight Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Freight Rate ($/MT)
                  </label>
                  <input
                    type="range"
                    min="0.8"
                    max="2.0"
                    step="0.1"
                    value={scenarioData.freightRate}
                    onChange={(e) =>
                      handleScenarioChange('freightRate', parseFloat(e.target.value))
                    }
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-sm mt-1 text-gray-600">${scenarioData.freightRate}</p>
                </div>
              </div>

              <div className="mt-6">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Simulate Scenario
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Reports & Downloads</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Optimization Summary', 'Cost Breakdown', 'Vessel Schedule', 'Delay Predictions'].map(
                  (report, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-medium text-gray-800">{report}</h4>
                        <p className="text-sm text-gray-500">PDF Format</p>
                      </div>
                      <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LogisticsDashboard;
