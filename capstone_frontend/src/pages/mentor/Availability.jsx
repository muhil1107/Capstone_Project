import React, { useState } from 'react';

const AvailabilitySlots = () => {
  const [slots, setSlots] = useState([
    { id: 1, day: 'Monday', times: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'] },
    { id: 2, day: 'Tuesday', times: ['9:00 AM - 11:00 AM', '3:00 PM - 5:00 PM'] },
    { id: 3, day: 'Wednesday', times: ['1:00 PM - 3:00 PM'] },
    { id: 4, day: 'Thursday', times: ['10:00 AM - 12:00 PM', '4:00 PM - 6:00 PM'] },
    { id: 5, day: 'Friday', times: ['11:00 AM - 1:00 PM'] }
  ]);

  const [newSlot, setNewSlot] = useState({ day: '', startTime: '', endTime: '' });

  const handleAddSlot = () => {
    if (newSlot.day && newSlot.startTime && newSlot.endTime) {
      const timeString = `${newSlot.startTime} - ${newSlot.endTime}`;
      const updatedSlots = slots.map(slot => 
        slot.day === newSlot.day 
          ? { ...slot, times: [...slot.times, timeString] }
          : slot
      );
      
      // If day doesn't exist, add new day
      if (!slots.some(slot => slot.day === newSlot.day)) {
        updatedSlots.push({ id: slots.length + 1, day: newSlot.day, times: [timeString] });
      }
      
      setSlots(updatedSlots);
      setNewSlot({ day: '', startTime: '', endTime: '' });
    }
  };

  const removeSlot = (day, timeIndex) => {
    const updatedSlots = slots.map(slot => 
      slot.day === day 
        ? { ...slot, times: slot.times.filter((_, index) => index !== timeIndex) }
        : slot
    ).filter(slot => slot.times.length > 0); // Remove days with no time slots
    
    setSlots(updatedSlots);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Availability Slots</h2>
      
      <div style={styles.addSlotForm}>
        <h3 style={styles.subtitle}>Add New Time Slot</h3>
        <div style={styles.formRow}>
          <select 
            value={newSlot.day} 
            onChange={(e) => setNewSlot({...newSlot, day: e.target.value})}
            style={styles.select}
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          
          <input 
            type="time"
            value={newSlot.startTime}
            onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
            style={styles.timeInput}
          />
          
          <span style={styles.toText}>to</span>
          
          <input 
            type="time"
            value={newSlot.endTime}
            onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
            style={styles.timeInput}
          />
          
          <button onClick={handleAddSlot} style={styles.addButton}>
            Add Slot
          </button>
        </div>
      </div>
      
      <div style={styles.slotsContainer}>
        <h3 style={styles.subtitle}>Your Availability</h3>
        {slots.length > 0 ? (
          slots.map(slot => (
            <div key={slot.id} style={styles.daySlot}>
              <h4 style={styles.dayTitle}>{slot.day}</h4>
              <div style={styles.timesList}>
                {slot.times.map((time, index) => (
                  <div key={index} style={styles.timeSlot}>
                    <span>{time}</span>
                    <button 
                      onClick={() => removeSlot(slot.day, index)}
                      style={styles.removeButton}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noSlots}>No availability slots set yet.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    margin: '0 0 20px 0',
    color: '#2c3e50'
  },
  subtitle: {
    margin: '0 0 15px 0',
    color: '#2c3e50'
  },
  addSlotForm: {
    marginBottom: '30px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  formRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap'
  },
  select: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  timeInput: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  toText: {
    color: '#7f8c8d'
  },
  addButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  slotsContainer: {
    padding: '10px 0'
  },
  daySlot: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #eee',
    borderRadius: '4px'
  },
  dayTitle: {
    margin: '0 0 10px 0',
    color: '#2c3e50'
  },
  timesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  timeSlot: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: '#e8f4fc',
    borderRadius: '4px',
    border: '1px solid #bee5eb'
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    padding: 0
  },
  noSlots: {
    color: '#7f8c8d',
    fontStyle: 'italic'
  }
};

export default AvailabilitySlots;
