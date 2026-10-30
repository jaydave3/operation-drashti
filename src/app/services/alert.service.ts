import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private hasSentAlert = false;

  /**
   * Silently detects client IP location and sends a high-priority push
   * notification to Jay's ntfy.sh topic. Runs completely in the background
   * without blocking UI or showing any popups.
   */
  async notifySiteUnlocked(): Promise<void> {
    if (this.hasSentAlert) return;
    this.hasSentAlert = true;

    try {
      const deviceInfo = this.getDeviceInfo();
      const locationData = await this.fetchIpLocation();

      const timeString = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const mapsLink = locationData.latitude && locationData.longitude
        ? `https://www.google.com/maps?q=${locationData.latitude},${locationData.longitude}`
        : '';

      const messageBody = [
        `🎉 Drashti just unlocked Operation Drashti!`,
        ``,
        `📍 Location: ${locationData.city || 'Unknown'}, ${locationData.region || ''} (${locationData.country || 'India'})`,
        `🏢 Network/ISP: ${locationData.org || 'Unknown'}`,
        `📱 Device: ${deviceInfo}`,
        `⏰ Time: ${timeString} IST`,
        mapsLink ? `🗺️ Map Area: ${mapsLink}` : ''
      ].filter(Boolean).join('\n');

      // Send to ntfy.sh topic (keep headers ASCII safe, emojis in body/tags)
      await fetch(`https://ntfy.sh/${APP_CONFIG.ntfyTopic}`, {
        method: 'POST',
        body: messageBody,
        headers: {
          'Title': 'Drashti Just Unlocked The Site!',
          'Priority': 'urgent',
          'Tags': 'tada,heart,stethoscope'
        }
      });
    } catch {
      // Fail completely silently to protect user experience
    }
  }

  private async fetchIpLocation(): Promise<{
    city?: string;
    region?: string;
    country?: string;
    org?: string;
    latitude?: number;
    longitude?: number;
  }> {
    try {
      // Primary attempt via freeipapi (fast, CORS-enabled, reliable)
      const res = await fetch('https://freeipapi.com/api/json', { signal: AbortSignal.timeout(3500) });
      if (res.ok) {
        const data = await res.json();
        return {
          city: data.cityName,
          region: data.regionName,
          country: data.countryName,
          org: data.isp || data.asnOrganization,
          latitude: data.latitude,
          longitude: data.longitude
        };
      }
    } catch {
      // Fallback attempt via ipapi.co
      try {
        const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3500) });
        if (res.ok) {
          const data = await res.json();
          return {
            city: data.city,
            region: data.region,
            country: data.country_name,
            org: data.org,
            latitude: data.latitude,
            longitude: data.longitude
          };
        }
      } catch {
        // Fallback returns empty if both are blocked
      }
    }

    return { city: 'Unknown Area', country: 'India' };
  }

  private getDeviceInfo(): string {
    const ua = navigator.userAgent;
    let device = 'Desktop Computer';

    if (/iPhone/i.test(ua)) device = 'iPhone 📱';
    else if (/iPad/i.test(ua)) device = 'iPad 📱';
    else if (/Android/i.test(ua)) device = 'Android Phone 📱';
    else if (/Windows/i.test(ua)) device = 'Windows PC 💻';
    else if (/Mac/i.test(ua)) device = 'MacBook 💻';

    let browser = 'Browser';
    if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Edg/i.test(ua)) browser = 'Edge';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';

    return `${device} (${browser})`;
  }
}
