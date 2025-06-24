"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Switch } from "@/src/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { toast } from "sonner";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    general: {
      appName: "Family Tree",
      defaultView: "vertical",
    },
    appearance: {
      theme: "light",
      enableAnimations: true,
      highContrastMode: false,
    },
    data: {
      autoSave: true,
      backupFrequency: "weekly",
      exportFormat: "json",
    },
    privacy: {
      showLivingDates: true,
      publicAccess: false,
      showSensitiveInfo: false,
    },
  });

  const handleGeneralChange = (key: string, value: string) => {
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [key]: value,
      },
    });
  };

  const handleAppearanceChange = (key: string, value: boolean | string) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [key]: value,
      },
    });
  };

  const handleDataChange = (key: string, value: boolean | string) => {
    setSettings({
      ...settings,
      data: {
        ...settings.data,
        [key]: value,
      },
    });
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: value,
      },
    });
  };

  const saveSettings = () => {
    // Here you would save the settings to your backend
    toast("Settings saved", {
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="container py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic application settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appName">Application Name</Label>
                <Input
                  id="appName"
                  value={settings.general.appName}
                  onChange={(e) =>
                    handleGeneralChange("appName", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultView">Default Tree View</Label>
                <Select
                  value={settings.general.defaultView}
                  onValueChange={(value) =>
                    handleGeneralChange("defaultView", value)
                  }
                >
                  <SelectTrigger id="defaultView">
                    <SelectValue placeholder="Select default view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vertical">Vertical</SelectItem>
                    <SelectItem value="horizontal">Horizontal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how the application looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.appearance.theme}
                  onValueChange={(value) =>
                    handleAppearanceChange("theme", value)
                  }
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="animations">Enable Animations</Label>
                <Switch
                  id="animations"
                  checked={settings.appearance.enableAnimations}
                  onCheckedChange={(checked) =>
                    handleAppearanceChange("enableAnimations", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="highContrast">High Contrast Mode</Label>
                <Switch
                  id="highContrast"
                  checked={settings.appearance.highContrastMode}
                  onCheckedChange={(checked) =>
                    handleAppearanceChange("highContrastMode", checked)
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Configure how your family tree data is managed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoSave">Auto-Save Changes</Label>
                <Switch
                  id="autoSave"
                  checked={settings.data.autoSave}
                  onCheckedChange={(checked) =>
                    handleDataChange("autoSave", checked)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <Select
                  value={settings.data.backupFrequency}
                  onValueChange={(value) =>
                    handleDataChange("backupFrequency", value)
                  }
                >
                  <SelectTrigger id="backupFrequency">
                    <SelectValue placeholder="Select backup frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="exportFormat">Default Export Format</Label>
                <Select
                  value={settings.data.exportFormat}
                  onValueChange={(value) =>
                    handleDataChange("exportFormat", value)
                  }
                >
                  <SelectTrigger id="exportFormat">
                    <SelectValue placeholder="Select export format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="gedcom">GEDCOM</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4 flex gap-4">
                <Button variant="outline">Export Data</Button>
                <Button variant="outline">Import Data</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control who can see your family tree and what information is
                displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showLivingDates">Show Living Dates</Label>
                  <p className="text-sm text-muted-foreground">
                    Display birth dates for living people
                  </p>
                </div>
                <Switch
                  id="showLivingDates"
                  checked={settings.privacy.showLivingDates}
                  onCheckedChange={(checked) =>
                    handlePrivacyChange("showLivingDates", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="publicAccess">Public Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anyone to view your family tree
                  </p>
                </div>
                <Switch
                  id="publicAccess"
                  checked={settings.privacy.publicAccess}
                  onCheckedChange={(checked) =>
                    handlePrivacyChange("publicAccess", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showSensitiveInfo">
                    Show Sensitive Information
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Display sensitive details like causes of death
                  </p>
                </div>
                <Switch
                  id="showSensitiveInfo"
                  checked={settings.privacy.showSensitiveInfo}
                  onCheckedChange={(checked) =>
                    handlePrivacyChange("showSensitiveInfo", checked)
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
