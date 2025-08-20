import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSave, FiX, FiInfo, FiPlus, FiTrash2, FiStar } from 'react-icons/fi';
import { Service } from '../types';
import {
  getAllServices,
  createService,
  updateService,
  deleteService
} from '../services/serviceService';



const ServiceManagement: React.FC = () => {
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    description: '',
    pricing: [{ duration: '', price: 0 }],
    features: [''],
    isPopular: false
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const services = await getAllServices();
      setServiceList(services);
    } catch (error) {
      console.error('Error loading services:', error);
      setErrorMessage('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (message: string, isError = false) => {
    if (isError) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(''), 5000);
    } else {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id!);
    setEditForm({ ...service });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!editingId || !editForm) return;

    try {
      await updateService(editingId, editForm);
      await loadServices();
      setEditingId(null);
      setEditForm({});
      showMessage('Service updated successfully!');
    } catch (error) {
      console.error('Error updating service:', error);
      showMessage('Failed to update service', true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await deleteService(id);
      await loadServices();
      showMessage('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      showMessage('Failed to delete service', true);
    }
  };

  const handleAddService = async () => {
    try {
      // Validate form
      if (!newServiceForm.name || !newServiceForm.description || newServiceForm.pricing.some(p => !p.duration || p.price <= 0)) {
        showMessage('Please fill in all required fields', true);
        return;
      }

      await createService(newServiceForm);
      await loadServices();
      setShowAddForm(false);
      setNewServiceForm({
        name: '',
        description: '',
        pricing: [{ duration: '', price: 0 }],
        features: [''],
        isPopular: false
      });
      showMessage('Service created successfully!');
    } catch (error) {
      console.error('Error creating service:', error);
      showMessage('Failed to create service', true);
    }
  };

  const handleInputChange = (field: keyof Service, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNewServiceChange = (field: keyof Service, value: any) => {
    setNewServiceForm(prev => ({ ...prev, [field]: value }));
  };

  const addPricingOption = (isEdit = false) => {
    if (isEdit) {
      setEditForm(prev => ({
        ...prev,
        pricing: [...(prev.pricing || []), { duration: '', price: 0 }]
      }));
    } else {
      setNewServiceForm(prev => ({
        ...prev,
        pricing: [...prev.pricing, { duration: '', price: 0 }]
      }));
    }
  };

  const removePricingOption = (index: number, isEdit = false) => {
    if (isEdit) {
      setEditForm(prev => ({
        ...prev,
        pricing: prev.pricing?.filter((_, i) => i !== index) || []
      }));
    } else {
      setNewServiceForm(prev => ({
        ...prev,
        pricing: prev.pricing.filter((_, i) => i !== index)
      }));
    }
  };

  const updatePricingOption = (index: number, field: 'duration' | 'price', value: string | number, isEdit = false) => {
    if (isEdit) {
      setEditForm(prev => ({
        ...prev,
        pricing: prev.pricing?.map((option, i) => 
          i === index ? { ...option, [field]: value } : option
        ) || []
      }));
    } else {
      setNewServiceForm(prev => ({
        ...prev,
        pricing: prev.pricing.map((option, i) => 
          i === index ? { ...option, [field]: value } : option
        )
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#19A7CE]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Service Management</h1>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-[#19A7CE] text-white rounded-lg hover:bg-[#146B8C] transition-colors duration-200"
          >
            <FiPlus className="h-4 w-4 mr-2" />
            Add Service
          </button>
        </div>
      </div>

      {/* Add Service Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Service</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Name *</label>
              <input
                type="text"
                value={newServiceForm.name}
                onChange={(e) => handleNewServiceChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19A7CE] focus:border-transparent"
                placeholder="Enter service name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={newServiceForm.description}
                onChange={(e) => handleNewServiceChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19A7CE] focus:border-transparent"
                placeholder="Describe what this service includes..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Options *</label>
              {newServiceForm.pricing.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={option.duration}
                    onChange={(e) => updatePricingOption(index, 'duration', e.target.value)}
                    placeholder="Duration (e.g., 30 minutes)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19A7CE] focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={option.price}
                    onChange={(e) => updatePricingOption(index, 'price', parseFloat(e.target.value) || 0)}
                    placeholder="Price"
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19A7CE] focus:border-transparent"
                  />
                  {newServiceForm.pricing.length > 1 && (
                    <button
                      onClick={() => removePricingOption(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addPricingOption()}
                className="text-[#19A7CE] hover:text-[#146B8C] text-sm font-medium"
              >
                + Add Pricing Option
              </button>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPopular"
                checked={newServiceForm.isPopular}
                onChange={(e) => handleNewServiceChange('isPopular', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="isPopular" className="text-sm text-gray-700">Mark as popular service</label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleAddService}
                className="flex items-center px-4 py-2 bg-[#19A7CE] text-white rounded-lg hover:bg-[#146B8C] transition-colors duration-200"
              >
                <FiSave className="h-4 w-4 mr-2" />
                Create Service
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                <FiX className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Services ({serviceList.length})</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your service offerings, prices, and descriptions</p>
        </div>

        <div className="divide-y divide-gray-200">
          {serviceList.map((service) => (
            <div key={service.id} className="p-4 sm:p-6">
              {editingId === service.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19A7CE] focus:border-transparent"
                      />
                    </div>

                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19A7CE] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Options</label>
                    {editForm.pricing?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={option.duration}
                          onChange={(e) => updatePricingOption(index, 'duration', e.target.value, true)}
                          placeholder="Duration"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19A7CE] focus:border-transparent"
                        />
                        <input
                          type="number"
                          value={option.price}
                          onChange={(e) => updatePricingOption(index, 'price', parseFloat(e.target.value) || 0, true)}
                          placeholder="Price"
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19A7CE] focus:border-transparent"
                        />
                        {(editForm.pricing?.length || 0) > 1 && (
                          <button
                            onClick={() => removePricingOption(index, true)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addPricingOption(true)}
                      className="text-[#19A7CE] hover:text-[#146B8C] text-sm font-medium"
                    >
                      + Add Pricing Option
                    </button>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`isPopular-${service.id}`}
                      checked={editForm.isPopular || false}
                      onChange={(e) => handleInputChange('isPopular', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`isPopular-${service.id}`} className="text-sm text-gray-700">Mark as popular service</label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center px-4 py-2 bg-[#19A7CE] text-white rounded-lg hover:bg-[#146B8C] transition-colors duration-200"
                    >
                      <FiSave className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                      <FiX className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{service.name}</h3>
                      <div className="flex items-center space-x-2">
                        {service.isPopular && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <FiStar className="h-3 w-3 mr-1" />
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Pricing:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {service.pricing?.map((option, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                            <span className="text-sm text-gray-600">{option.duration}</span>
                            <span className="font-semibold text-[#19A7CE]">£{option.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-2">{service.description}</p>
                    
                    {service.features && service.features.length > 0 && (
                      <div className="mb-2">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Features:</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {service.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      <FiEdit2 className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id!)}
                      className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                    >
                      <FiTrash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {serviceList.length === 0 && (
        <div className="text-center py-12">
          <FiInfo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first service.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center mx-auto px-4 py-2 bg-[#19A7CE] text-white rounded-lg hover:bg-[#146B8C] transition-colors duration-200"
          >
            <FiPlus className="h-4 w-4 mr-2" />
            Add Your First Service
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;