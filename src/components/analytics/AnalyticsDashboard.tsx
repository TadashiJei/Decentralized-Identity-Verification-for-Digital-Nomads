import React, { useEffect } from "react";
import { useAnalytics } from "../../hooks/useAnalytics";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Icon } from "@iconify/react";

export const AnalyticsDashboard: React.FC = () => {
  const { eventAnalytics, organiserAnalytics, fetchAnalytics } = useAnalytics();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (!eventAnalytics || !organiserAnalytics) {
    return (
      <div className="flex justify-center items-center h-64">
        <Icon icon="heroicons:arrow-path" className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-600">
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Icon
                icon="heroicons:calendar"
                className="w-6 h-6 text-primary mr-2"
              />
              <span className="text-2xl font-bold">
                {eventAnalytics.totalEvents}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-600">
              Total Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Icon
                icon="heroicons:users"
                className="w-6 h-6 text-primary mr-2"
              />
              <span className="text-2xl font-bold">
                {eventAnalytics.totalParticipants}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-600">
              Revenue Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Icon
                icon="heroicons:currency-dollar"
                className="w-6 h-6 text-primary mr-2"
              />
              <span className="text-2xl font-bold">
                {eventAnalytics.revenueGenerated} TON
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-600">
              Certificates Issued
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Icon
                icon="heroicons:academic-cap"
                className="w-6 h-6 text-primary mr-2"
              />
              <span className="text-2xl font-bold">
                {organiserAnalytics.certificatesIssued}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-600">
              Popular Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventAnalytics.popularCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-base font-medium">
                    {category.category}
                  </span>
                  <div className="flex items-center">
                    <span className="text-base text-gray-600">
                      {category.count} events
                    </span>
                    <div
                      className="ml-2 h-2 bg-primary rounded"
                      style={{
                        width: `${(
                          (category.count / eventAnalytics.totalEvents) *
                          100
                        ).toFixed(0)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-600">
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventAnalytics.monthlyTrends.map((trend, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-base">
                    <span>{trend.month}</span>
                    <span>{trend.eventCount} events</span>
                  </div>
                  <div className="flex justify-between text-base text-gray-600">
                    <span>Participants</span>
                    <span>{trend.participantCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
