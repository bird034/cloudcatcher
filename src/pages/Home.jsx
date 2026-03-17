.crisis-popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.crisis-popup {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 420px;
  width: 90%;
  text-align: center;
}

.crisis-popup-emoji {
  font-size: 48px;
  margin-bottom: 16px;
}

.crisis-popup h3 {
  font-size: 22px;
  color: #2c2c54;
  margin-bottom: 12px;
}

.crisis-popup p {
  color: #555;
  margin-bottom: 24px;
  line-height: 1.6;
}

.crisis-popup-btn {
  display: block;
  background: #7c6fcd;
  color: white;
  padding: 14px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 12px;
}

.crisis-popup-link {
  display: block;
  color: #7c6fcd;
  margin-bottom: 20px;
  text-decoration: none;
  font-size: 14px;
}

.crisis-popup-close {
  background: none;
  border: none;
  color: #aaa;
  font-size: 13px;
  cursor: pointer;
}

.cause-picker {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
}

.cause-picker h3 {
  font-size: 26px;
  color: #2c2c54;
  margin-bottom: 8px;
}

.cause-picker p {
  color: #666;
  margin-bottom: 28px;
}

.cause-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.cause-btn {
  background: white;
  border: 2px solid #e0d9ff;
  border-radius: 12px;
  padding: 16px;
  font-size: 15px;
  color: #2c2c54;
  cursor: pointer;
  transition: all 0.2s;
}

.cause-btn:hover {
  background: #f0ebff;
  border-color: #7c6fcd;
}

.cause-tag {
  text-align: center;
  color: #7c6fcd;
  font-size: 14px;
  margin-bottom: 24px;
}

.emotion-next {
  text-align: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e0d9ff;
}

.emotion-selected-text {
  color: #666;
  margin-bottom: 16px;
  font-size: 14px;
}

.response-block {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.response-emotion-title {
  font-size: 20px;
  color: #2c2c54;
  margin-bottom: 16px;
}
