"use client";

import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaDollarSign, FaMapMarkerAlt, FaTools, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Logo from "@/components/ui/logo";

// Expanded contracts data with additional details like location, contract type, and company size
const contractsData = [
    {
        id: 1,
        title: "Contract A",
        description: "Service agreement for project support.",
        date: "2023-01-10",
        status: "Active",
        clientName: "Alice Johnson",
        value: "$15,000",
        duration: "6 months",
        contractType: "Construction",
        location: "New York, NY",
        companySize: "Company of 5",
        distance: "50 miles",
        action: "View Details"
    },
    {
        id: 2,
        title: "Contract B",
        description: "Marketing consultancy and strategy planning.",
        date: "2023-02-15",
        status: "Inactive",
        clientName: "Bob Smith",
        value: "$8,500",
        duration: "3 months",
        contractType: "Plumbing",
        location: "Los Angeles, CA",
        companySize: "Individual",
        distance: "30 miles",
        action: "Contact Client"
    },
    {
        id: 3,
        title: "Contract C",
        description: "Product design and prototyping.",
        date: "2023-03-20",
        status: "Active",
        clientName: "Chris Doe",
        value: "$12,000",
        duration: "4 months",
        contractType: "HVAC",
        location: "Chicago, IL",
        companySize: "Company of 5",
        distance: "100 miles",
        action: "View Details"
    },
    // Add more contract objects here...
];

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedContractType, setSelectedContractType] = useState('All');
    const [selectedCompanySize, setSelectedCompanySize] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDistance, setSelectedDistance] = useState('');
    const [selectedContractValue, setSelectedContractValue] = useState<'All' | '<$10k' | '$10k - $20k' | '$20k+'>('All');
    const [filtersOpen, setFiltersOpen] = useState(false);

    const handleChangeSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
    };

    const handleChangeContractType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedContractType(event.target.value);
    };

    const handleChangeCompanySize = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCompanySize(event.target.value);
    };

    const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedLocation(event.target.value);
    };

    const handleChangeDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDistance(event.target.value);
    };

    const handleChangeContractValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedContractValue(event.target.value as 'All' | '<$10k' | '$10k - $20k' | '$20k+');
    };

    // Toggle the filter section visibility
    const toggleFilters = () => {
        setFiltersOpen(!filtersOpen);
    };

    // Filter contracts based on the filters
    const filteredContracts = contractsData.filter((contract) => {
        const matchesSearchTerm = contract.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || contract.status === selectedStatus;
        const matchesContractType = selectedContractType === 'All' || contract.contractType === selectedContractType;
        const matchesCompanySize = selectedCompanySize === 'All' || contract.companySize === selectedCompanySize;
        const matchesLocation = selectedLocation === '' || contract.location.toLowerCase().includes(selectedLocation.toLowerCase());
        const matchesDistance = selectedDistance === '' || parseInt(contract.distance.replace(/[^0-9]/g, '')) <= parseInt(selectedDistance);
        const matchesContractValue =
            selectedContractValue === 'All' ||
            (selectedContractValue === '<$10k' && parseInt(contract.value.replace(/[^0-9]/g, '')) < 10000) ||
            (selectedContractValue === '$10k - $20k' && parseInt(contract.value.replace(/[^0-9]/g, '')) >= 10000 && parseInt(contract.value.replace(/[^0-9]/g, '')) <= 20000) ||
            (selectedContractValue === '$20k+' && parseInt(contract.value.replace(/[^0-9]/g, '')) > 20000);

        return (
            matchesSearchTerm &&
            matchesStatus &&
            matchesContractType &&
            matchesCompanySize &&
            matchesLocation &&
            matchesDistance &&
            matchesContractValue
        );
    });

    return (
        <div className="pt-20 pb-10 px-32 text-center bg-gray-100">
            <div className="mb-16">
                <Logo />
                <h1 className="text-5xl text-gray-800 mb-10 font-fantasy font-semibold">Contractual</h1>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-4xl mx-auto mb-6">
                <input
                    type="text"
                    placeholder="Search contracts..."
                    value={searchTerm}
                    onChange={handleChangeSearchTerm}
                    className="w-full p-4 text-lg border-2 border-blue-500 rounded-full focus:border-green-500 focus:shadow-md outline-none transition-colors duration-300 bg-gray-100"
                />
            </div>

            {/* Filters Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                    onClick={toggleFilters}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2"
                >
                    {filtersOpen ? <FaChevronUp /> : <FaChevronDown />}
                    <span>{filtersOpen ? 'Collapse' : 'Expand'}</span>
                </button>
            </div>

            {/* Collapsible Filter Form */}
            <div
                className={`transition-all duration-500 ease-in-out ${filtersOpen ? 'max-h-[500px]' : 'max-h-0'} overflow-hidden`}
            >
                <div className="flex flex-wrap gap-6 justify-center mb-6">
                    {/* Status Filter */}
                    <select
                        value={selectedStatus}
                        onChange={handleChangeStatus}
                        className="p-3 pr-12 pl-4 border-2 rounded-lg bg-gray-50 w-full sm:w-auto"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    {/* Contract Type Filter */}
                    <select
                        value={selectedContractType}
                        onChange={handleChangeContractType}
                        className="p-3 pr-12 pl-4 border-2 rounded-lg bg-gray-50 w-full sm:w-auto"
                    >
                        <option value="All">All Types</option>
                        <option value="Construction">Construction</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="HVAC">HVAC</option>
                    </select>

                    {/* Company Size Filter */}
                    <select
                        value={selectedCompanySize}
                        onChange={handleChangeCompanySize}
                        className="p-3 pr-12 pl-4 border-2 rounded-lg bg-gray-50 w-full sm:w-auto"
                    >
                        <option value="All">All Company Sizes</option>
                        <option value="Individual">Individual</option>
                        <option value="Company of 5">Company of 5</option>
                        <option value="Company of 10">Company of 10</option>
                    </select>

                    {/* Location Filter */}
                    <input
                        type="text"
                        placeholder="Location"
                        value={selectedLocation}
                        onChange={handleChangeLocation}
                        className="p-3 pr-12 pl-4 border-2 rounded-lg bg-gray-50 w-full sm:w-auto"
                    />

                    {/* Distance Willing to Travel */}
                    <input
                        type="text"
                        placeholder="Distance (miles)"
                        value={selectedDistance}
                        onChange={handleChangeDistance}
                        className="p-3 pr-12 pl-4 border-2 rounded-lg bg-gray-50 w-full sm:w-auto"
                    />

                    {/* Contract Value Filter */}
                    <select
                        value={selectedContractValue}
                        onChange={handleChangeContractValue}
                        className="p-3 pr-12 pl-4 border-2 rounded-lg bg-gray-50 w-full sm:w-auto"
                    >
                        <option value="All">All Values</option>
                        <option value="<$10k">Less than $10k</option>
                        <option value="$10k - $20k">$10k - $20k</option>
                        <option value="$20k+">Greater than $20k</option>
                    </select>
                </div>
            </div>

            {/* Filtered Contracts */}
            <div className="flex flex-wrap gap-6 mt-10 justify-center">
                {filteredContracts.map((contract) => (
                    <div
                        key={contract.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-sm shadow-lg transform transition-transform duration-300 hover:scale-105"
                    >
                        <div className="flex items-center gap-3 justify-between mb-3">
                            <h3 className="text-lg text-gray-800 font-semibold hover:text-blue-500 transition-colors">
                                {contract.title}
                            </h3>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    contract.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                }`}
                            >
                {contract.status}
              </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-6 mb-3">{contract.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                            <FaUser /> Client: {contract.clientName}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                            <FaDollarSign /> Value: {contract.value}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                            <FaTools /> Type: {contract.contractType}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                            <FaMapMarkerAlt /> Location: {contract.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                            <FaCalendarAlt /> Duration: {contract.duration}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                            <FaCalendarAlt /> Start Date: {contract.date}
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-green-500 transition-colors duration-300 font-medium focus:outline-none">
                            {contract.action}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
