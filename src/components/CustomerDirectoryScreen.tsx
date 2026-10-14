import React, { useState, useMemo } from 'react';
import { PublicRestaurant, ReadinessStatus } from '../types/assessment';
import { HalalKeepsLogo } from './HalalKeepsLogo';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Utensils, 
  Info, 
  ShoppingBag, 
  Star, 
  TrendingUp, 
  Store, 
  Users, 
  User, 
  Gauge, 
  Eye, 
  Calendar, 
  Signal, 
  Check, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

interface CustomerDirectoryScreenProps {
  restaurants: PublicRestaurant[];
  onViewRestaurantProfile: (restaurant: PublicRestaurant) => void;
  onNavigateToBusinessPortal: () => void;
  onOrderFood?: (restaurant: PublicRestaurant) => void;
}

export const CustomerDirectoryScreen: React.FC<CustomerDirectoryScreenProps> = ({
  restaurants,
  onViewRestaurantProfile,
  onNavigateToBusinessPortal,
  onOrderFood,
}) => {
  const [activeMenuTab, setActiveMenuTab] = useState<'restaurants' | 'dashboard' | 'orders' | 'reviews' | 'demand' | 'profile'>('restaurants');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ReadinessStatus>('All');
  const [sortBy, setSortBy] = useState<'score-desc' | 'score-asc' | 'views-desc'>('score-desc');
  const [orderedRestaurant, setOrderedRestaurant] = useState<PublicRestaurant | null>(null);

  // Filter only published restaurants
  const publishedRestaurants = useMemo(() => {
    return restaurants.filter((r) => r.publishStatus === 'Published');
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    let result = [...publishedRestaurants];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.address.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter((r) => r.readinessStatus === statusFilter);
    }

    result.sort((a, b) => {
      if (sortBy === 'score-desc') return b.readinessPercentage - a.readinessPercentage;
      if (sortBy === 'score-asc') return a.readinessPercentage - b.readinessPercentage;
      if (sortBy === 'views-desc') return b.profileViews - a.profileViews;
      return 0;
    });

    return result;
  }, [publishedRestaurants, searchQuery, statusFilter, sortBy]);

  const handleOrderClick = (restaurant: PublicRestaurant) => {
    setOrderedRestaurant(restaurant);
    if (onOrderFood) onOrderFood(restaurant);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[820px] bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-300 shadow-xl">
      {/* 1. Left Sidebar — Dark Navy Aesthetic matching Screenshot */}
      <aside className="w-full lg:w-64 bg-[#0B132B] text-neutral-300 flex flex-col justify-between shrink-0 p-4 border-r border-slate-800">
        <div className="space-y-6">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 px-2 py-2">
            <HalalKeepsLogo size={36} showText={false} />
            <div>
              <div className="text-sm font-extrabold text-white tracking-tight leading-none">
                Halal Keeps
              </div>
              <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                Halal Marketplace
              </div>
            </div>
          </div>

          {/* Main Menu Section */}
          <div>
            <div className="text-[10px] font-mono tracking-wider uppercase text-slate-400 px-3 mb-2 font-bold">
              MAIN MENU
            </div>
            <nav className="space-y-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveMenuTab('dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                  activeMenuTab === 'dashboard'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Gauge className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMenuTab('restaurants')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                  activeMenuTab === 'restaurants'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Halal Restaurants</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMenuTab('orders')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                  activeMenuTab === 'orders'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>My Orders</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMenuTab('reviews')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                  activeMenuTab === 'reviews'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Star className="w-4 h-4" />
                <span>My Reviews</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMenuTab('demand')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                  activeMenuTab === 'demand'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Demand Survey</span>
              </button>

              {/* Direct Link to Business Owner Portal */}
              <button
                type="button"
                onClick={onNavigateToBusinessPortal}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-emerald-300 hover:bg-emerald-950/60 hover:text-emerald-200 transition-colors cursor-pointer text-left border border-emerald-900/40 mt-1"
                title="Switch to Food Business Owner Assessment & Publishing Portal"
              >
                <Store className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">Register as a Business</span>
              </button>

              <button
                type="button"
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/60 hover:text-white transition-colors cursor-pointer text-left"
              >
                <Users className="w-4 h-4" />
                <span>Staff Applications</span>
              </button>
            </nav>
          </div>

          {/* Account Section */}
          <div>
            <div className="text-[10px] font-mono tracking-wider uppercase text-slate-400 px-3 mb-2 font-bold">
              ACCOUNT
            </div>
            <button
              type="button"
              onClick={() => setActiveMenuTab('profile')}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors cursor-pointer text-xs text-left"
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>
          </div>
        </div>

        {/* User Card at Bottom: Taehyun Kang (Customer) */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
            T
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">
              Taehyun Kang
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">
              Customer
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 p-5 sm:p-7 flex flex-col justify-between overflow-x-hidden">
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Halal Directory
                </span>
                <span className="text-neutral-400 text-xs">·</span>
                <span className="text-xs text-neutral-500 font-medium">
                  Davao City & Regional Dining
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                Discover Halal-Ready Restaurants
              </h1>
              <p className="text-xs text-neutral-600 mt-0.5">
                Explore food establishments that have chosen to share their halal readiness assessment results.
              </p>
            </div>

            {/* Business Portal Quick Button */}
            <button
              type="button"
              onClick={onNavigateToBusinessPortal}
              className="self-start md:self-center inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-950 bg-white border border-emerald-300 hover:bg-emerald-50 transition-colors shadow-2xs cursor-pointer shrink-0"
            >
              <Store className="w-4 h-4 text-emerald-700" />
              <span>Food Business Owner Portal</span>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurant name, cuisine, or address..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
              {(['All', 'High Readiness', 'Nearly Ready', 'Developing Readiness', 'Needs Improvement'] as const).map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      statusFilter === status
                        ? 'bg-[#0B132B] text-white shadow-2xs'
                        : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Restaurant Cards Grid — Exact Match to Uploaded Screenshot */}
          {filteredRestaurants.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-300 p-12 text-center shadow-xs">
              <Utensils className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-900">
                No Published Restaurants Found
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                No published establishments match your search or filter. Try switching filter tabs or clearing search keywords.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                }}
                className="mt-4 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-700 rounded-lg cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRestaurants.map((res) => {
                const isOwner = res.isOwnerBusiness;
                const isHighReady = res.readinessPercentage >= 90;
                const isNearReady = res.readinessPercentage >= 70 && res.readinessPercentage < 90;

                return (
                  <div
                    key={res.id}
                    className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md flex flex-col justify-between ${
                      isOwner
                        ? 'border-emerald-500 ring-2 ring-emerald-200/80'
                        : 'border-neutral-200'
                    }`}
                  >
                    <div>
                      {/* 1. Card Top Banner with Visual Branding & Badges (Matching Screenshot) */}
                      <div
                        className={`h-40 w-full relative flex items-center justify-center p-4 bg-gradient-to-br ${
                          res.bannerBg || (isHighReady ? 'from-emerald-950 via-emerald-900 to-emerald-950' : 'from-emerald-50 via-teal-50 to-emerald-100')
                        }`}
                      >
                        {/* Top-Left: Halal Certified Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#033126]/90 backdrop-blur-xs text-white text-[11px] font-bold shadow-2xs border border-emerald-500/40">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span>Halal Certified</span>
                        </div>

                        {/* Owner Badge if Green Crescent */}
                        {isOwner && (
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-2xs">
                            Your Listing
                          </div>
                        )}

                        {/* Center Visual: Brand Art or Cute Store Awning Silhouette */}
                        {res.id === 'res-tinhat-company' ? (
                          <div className="flex flex-col items-center justify-center text-center text-amber-200">
                            <div className="text-xl font-serif italic tracking-wide font-black text-amber-300 drop-shadow-xs">
                              Tinhat
                            </div>
                            <div className="text-[9px] font-mono tracking-widest uppercase text-amber-100/90 mt-0.5">
                              COMPANY, INC.
                            </div>
                            <div className="text-[10px] text-amber-200/90 font-serif mt-1">
                              Boutique Hotel, Restaurant & Catering
                            </div>
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 backdrop-blur-xs flex items-center justify-center text-emerald-700/80">
                            <Store className="w-9 h-9 stroke-[1.8]" />
                          </div>
                        )}

                        {/* Bottom-Left: Halal Ready Badge (matching screenshot blue pill) */}
                        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-blue-700 text-xs font-bold shadow-xs border border-blue-100">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>{res.formattedPercentage} Halal Ready</span>
                        </div>
                      </div>

                      {/* 2. Card Content Body */}
                      <div className="p-5 space-y-4">
                        {/* Restaurant Title & Address */}
                        <div>
                          <h3 className="text-lg font-black text-neutral-900 leading-snug">
                            {res.name}
                          </h3>
                          <div className="mt-1 flex items-start gap-1.5 text-xs text-neutral-500">
                            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-2 leading-relaxed">{res.address}</span>
                          </div>
                          <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                            <Utensils className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{res.cuisine}</span>
                          </div>
                        </div>

                        {/* Credibility Score Bar (matching screenshot) */}
                        <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-neutral-700 flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                              Credibility Score
                            </span>
                            <span className="font-mono font-extrabold text-neutral-900">
                              {res.credibilityScore}/100
                            </span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-slate-600 h-full rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(res.credibilityScore, 100)}%` }}
                            />
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                            <span>★ ★ ★</span>
                            <span className="text-neutral-500 font-medium">
                              {res.credibilityScore > 70 ? 'Ranked Tier 1' : 'Unranked'}
                            </span>
                          </div>
                        </div>

                        {/* Profile Views & Dine-ins (matching screenshot 2-column cards) */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="p-2.5 rounded-xl border border-sky-200 bg-sky-50/40 text-xs">
                            <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-sky-800 flex items-center gap-1">
                              <Eye className="w-3 h-3 text-sky-600" />
                              PROFILE VIEWS
                            </div>
                            <div className="text-xl font-black font-mono text-sky-950 mt-0.5">
                              {res.profileViews}
                            </div>
                            <div className="text-[10px] text-sky-700/80">last 30 days</div>
                          </div>

                          <div className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/40 text-xs">
                            <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-800 flex items-center gap-1">
                              <Utensils className="w-3 h-3 text-amber-600" />
                              DINE-INS
                            </div>
                            <div className="text-xl font-black font-mono text-amber-950 mt-0.5">
                              {res.dineIns}
                            </div>
                            <div className="text-[10px] text-amber-700/80">last 30 days</div>
                          </div>
                        </div>

                        {/* Foot Traffic & Service Badges */}
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-neutral-600">
                            <span className="text-[11px] font-medium text-neutral-400">Foot Traffic:</span>
                            <div className="flex items-center gap-1 text-emerald-800 font-bold">
                              <Signal className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{res.footTraffic}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            {res.services.map((svc) => (
                              <span
                                key={svc}
                                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100"
                              >
                                {svc}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Halal Readiness Strip (matching screenshot blue container) */}
                        <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-blue-950 flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                              Halal Readiness
                            </span>
                            <span className="font-mono font-extrabold text-blue-900">
                              {res.formattedPercentage}
                            </span>
                          </div>
                          <div className="w-full bg-blue-200/80 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full transition-all duration-300"
                              style={{ width: `${res.readinessPercentage}%` }}
                            />
                          </div>
                          <div className="text-[10px] font-semibold text-blue-700">
                            {res.readinessStatus}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. Action Buttons (matching screenshot: [Order Food] [Details]) */}
                    <div className="p-5 pt-0 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleOrderClick(res)}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Order Food</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onViewRestaurantProfile(res)}
                        className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 active:bg-emerald-100 text-emerald-900 border border-emerald-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mandatory Public Readiness Score Disclaimer */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-5 shadow-2xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                <h4 className="font-bold text-amber-950 text-xs sm:text-sm">
                  Public Halal Readiness Score Notice & Disclaimer
                </h4>
                <p className="mt-1 text-xs text-amber-900">
                  Halal readiness scores reflect self-reported assessment responses and are intended for informational purposes only. A high score does not constitute official halal certification or guarantee that an establishment is halal-certified. Customers should verify certification status with the relevant certification body.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Order Food Modal Preview */}
      {orderedRestaurant && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-neutral-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-700" />
                <h3 className="text-sm font-bold text-neutral-900">
                  Order from {orderedRestaurant.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOrderedRestaurant(null)}
                className="text-neutral-400 hover:text-neutral-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 text-xs text-emerald-950 flex items-center justify-between">
              <div>
                <span className="font-bold block">HaCeRa Halal Assurance Verified</span>
                <span className="text-[11px] text-emerald-800">
                  Readiness Score: {orderedRestaurant.formattedPercentage}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold text-[10px]">
                Active
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-neutral-800">Popular Halal Menu Items:</div>
              <div className="p-2.5 rounded-lg border border-neutral-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-neutral-900">Signature Grilled Chicken Platter</div>
                  <div className="text-[11px] text-neutral-500">Certified halal poultry, seasoned basmati rice</div>
                </div>
                <span className="font-mono font-bold text-neutral-800">₱280</span>
              </div>
              <div className="p-2.5 rounded-lg border border-neutral-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-neutral-900">Beef Shawarma Wrap</div>
                  <div className="text-[11px] text-neutral-500">Halal sirloin, garlic tahini, pickled turnip</div>
                </div>
                <span className="font-mono font-bold text-neutral-800">₱195</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setOrderedRestaurant(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Order placed successfully with ${orderedRestaurant.name}!`);
                  setOrderedRestaurant(null);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-xs cursor-pointer"
              >
                Checkout Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
