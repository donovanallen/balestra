'use client';

import React, { useState, useMemo } from 'react';
import { Metadata } from 'next';
import { 
  Search, 
  Filter, 
  Plus, 
  Grid3x3, 
  List,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Package,
  Settings
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EquipmentCard } from '@/components/equipment-card';
import { cn } from '@/lib/utils';
import type { Equipment, EquipmentDisplayState } from '@/types';
import { getEquipmentDisplayStates, mockEquipment } from '@/lib/mock-data';
import { EQUIPMENT_CATEGORIES } from '@/lib/constants';

export default function ArmoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<'all' | 'equipped' | 'maintenance'>('all');
  
  // Mock equipment data - in real app, this would come from a database/store
  const [equipment] = useState<Equipment[]>(mockEquipment);
  
  // Generate display states
  const displayStates = useMemo(() => 
    getEquipmentDisplayStates(equipment), [equipment]
  );
  
  // Filter equipment based on search and filters
  const filteredDisplayStates = useMemo(() => {
    return displayStates.filter(state => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesCategory = state.category.name.toLowerCase().includes(query);
        const matchesItems = state.items.some(item => 
          item.brand?.toLowerCase().includes(query) ||
          item.model?.toLowerCase().includes(query) ||
          item.subtype?.toLowerCase().includes(query)
        );
        if (!matchesCategory && !matchesItems) return false;
      }
      
      // Status filter
      if (filterStatus === 'equipped' && !state.equippedItem) return false;
      if (filterStatus === 'maintenance' && state.needsMaintenance === 0) return false;
      
      return true;
    });
  }, [displayStates, searchQuery, filterStatus]);
  
  // Calculate summary statistics
  const stats = useMemo(() => {
    const totalItems = equipment.length;
    const equippedItems = equipment.filter(item => item.isEquipped).length;
    const maintenanceItems = equipment.filter(item => 
      item.maintenanceReminders.some(reminder => !reminder.completed)
    ).length;
    const totalValue = equipment.reduce((sum, item) => sum + (item.cost || 0), 0);
    
    return {
      totalItems,
      equippedItems,
      maintenanceItems,
      totalValue,
      categories: displayStates.filter(state => !state.isEmpty).length,
    };
  }, [equipment, displayStates]);
  
  // Event handlers for equipment actions
  const handleAddItem = (categoryType: string) => {
    console.log('Adding item to category:', categoryType);
    // In real app: open add equipment modal/form
  };
  
  const handleEditItem = (item: Equipment) => {
    console.log('Editing item:', item);
    // In real app: open edit equipment modal/form
  };
  
  const handleRemoveItem = (item: Equipment) => {
    console.log('Removing item:', item);
    // In real app: show confirmation and remove item
  };
  
  const handleEquipItem = (item: Equipment) => {
    console.log('Equipping item:', item);
    // In real app: update equipment state
  };

  return (
    <main className="container mx-auto max-w-7xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Armory</h1>
          <p className="text-muted-foreground mt-1">
            Manage your fencing equipment collection and maintenance
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Equipment
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalItems}</p>
                <p className="text-xs text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.equippedItems}</p>
                <p className="text-xs text-muted-foreground">Equipped</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.maintenanceItems}</p>
                <p className="text-xs text-muted-foreground">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalValue}</p>
                <p className="text-xs text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900">
                <Grid3x3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.categories}</p>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'equipped' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('equipped')}
            >
              Equipped
            </Button>
            <Button
              variant={filterStatus === 'maintenance' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('maintenance')}
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              Maintenance
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Equipment Grid */}
      {filteredDisplayStates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-muted/50 mb-4">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">No equipment found</h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            {searchQuery || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters to find equipment'
              : 'Start building your armory by adding your first piece of equipment'
            }
          </p>
          {!searchQuery && filterStatus === 'all' && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Equipment
            </Button>
          )}
        </div>
      ) : (
        <div className={cn(
          'grid gap-6',
          viewMode === 'grid' 
            ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
            : 'grid-cols-1'
        )}>
          {filteredDisplayStates.map((displayState) => (
            <EquipmentCard
              key={displayState.category.type}
              displayState={displayState}
              onAddItem={() => handleAddItem(displayState.category.type)}
              onEditItem={handleEditItem}
              onRemoveItem={handleRemoveItem}
              onEquipItem={handleEquipItem}
              className={cn(
                viewMode === 'list' && 'max-w-none'
              )}
            />
          ))}
        </div>
      )}
    </main>
  );
}