from flask import Flask, jsonify, request
from flask_cors import CORS
from googleapiclient.discovery import build
import datetime

app = Flask(__name__)
CORS(app)

API_KEY = "AIzaSyDfQ4hD_2Ex13JfmsXOFGzhYACoIdswxyQ"

# In-memory data stores
influencers_data = [
    {
        "id": "1",
        "title": "Emma Chen",
        "thumbnail": "https://via.placeholder.com/150",
        "category": "beauty",
        "platform": "instagram",
        "audience": "women_25_40",
        "productType": "skincare",
        "stats": {
            "subscribers": 128000,
            "views": 5000000,
            "videos": 150,
            "engagement_rate": 4.2,
        },
    },
    {
        "id": "2",
        "title": "Mike Roberts",
        "thumbnail": "https://via.placeholder.com/150",
        "category": "technology",
        "platform": "youtube",
        "audience": "men_18_35",
        "productType": "gadgets",
        "stats": {
            "subscribers": 450000,
            "views": 12000000,
            "videos": 200,
            "engagement_rate": 3.8,
        },
    },
]

campaigns_data = [
    {
        "id": 1,
        "name": "Summer Collection Launch",
        "status": "active",
        "messagesSent": 45,
        "responses": 12,
        "createdAt": "2024-06-15",
        "scheduledFor": "2024-07-01"
    },
    {
        "id": 2,
        "name": "Product Review Campaign",
        "status": "completed",
        "messagesSent": 30,
        "responses": 8,
        "createdAt": "2024-05-20",
        "scheduledFor": "2024-06-01"
    }
]

templates_data = [
    {
        "id": 1,
        "name": "Collaboration Proposal",
        "content": "Hi {name}, I loved your recent content about {topic}! We'd love to collaborate with you on our new product launch.",
        "usedCount": 23
    },
    {
        "id": 2,
        "name": "Product Review Request",
        "content": "Hello {name}, Your expertise in {niche} is impressive! Would you be interested in reviewing our new product?",
        "usedCount": 15
    }
]

collaborators_data = [
    {
        "id": 1,
        "name": "Sarah Wilson",
        "email": "sarah@design.com",
        "role": "Marketing Manager",
        "avatar": None,
        "joinDate": "2024-01-15",
        "status": "active",
        "permissions": ["view_campaigns", "manage_influencers"]
    },
    {
        "id": 2,
        "name": "Mike Chen",
        "email": "mike@analytics.com",
        "role": "Data Analyst",
        "avatar": None,
        "joinDate": "2024-03-22",
        "status": "active",
        "permissions": ["view_analytics", "view_reports"]
    }
]

user_data = {
    "id": 1,
    "name": "Alex Johnson",
    "email": "alex@company.com",
    "company": "TechStyle Fashion",
    "industry": "Fashion & Lifestyle",
    "memberSince": "2023",
    "avatar": None,
    "phone": "+1 (555) 123-4567",
    "location": "New York, USA"
}

dashboard_stats = {
    "totalInfluencers": 1247,
    "activeCampaigns": 8,
    "responseRate": 28.5,
    "totalReach": 2450000,
    "engagementRate": 5.2,
    "totalROI": 3.8
}

dashboard_campaigns = [
    {
        "id": 1,
        "name": "Summer Collection Launch",
        "progress": 78,
        "status": "active",
        "influencers": 24,
        "budget": 5000,
        "spent": 3900,
        "startDate": "2024-06-01",
        "endDate": "2024-07-15"
    },
    {
        "id": 2,
        "name": "Product Review Campaign",
        "progress": 45,
        "status": "active",
        "influencers": 18,
        "budget": 3000,
        "spent": 1350,
        "startDate": "2024-06-15",
        "endDate": "2024-07-30"
    }
]

dashboard_recent_activity = [
    {
        "id": 1,
        "type": "campaign_created",
        "message": "New campaign \"Summer Launch\" created",
        "timestamp": "2024-06-20T10:30:00Z",
        "user": "You"
    },
    {
        "id": 2,
        "type": "influencer_added",
        "message": "Emma Chen added to campaign",
        "timestamp": "2024-06-20T09:15:00Z",
        "user": "System"
    }
]

analytics_data = {
    "overview": {
        "totalCampaigns": 12,
        "totalInfluencers": 45,
        "totalReach": 2500000,
        "totalEngagement": 125000,
        "averageROI": 3.8,
        "responseRate": 28.5,
        "conversionRate": 12.3
    },
    "campaignPerformance": [
        {"name": "Summer Launch", "reach": 450000, "engagement": 22500, "conversions": 1250, "roi": 4.2},
        {"name": "Product Review", "reach": 320000, "engagement": 16000, "conversions": 890, "roi": 3.5},
        {"name": "Brand Awareness", "reach": 280000, "engagement": 14000, "conversions": 750, "roi": 2.8},
        {"name": "Holiday Campaign", "reach": 510000, "engagement": 25500, "conversions": 1420, "roi": 4.8}
    ],
    "platformBreakdown": [
        {"platform": "Instagram", "campaigns": 8, "reach": 1800000, "engagement": 90000},
        {"platform": "YouTube", "campaigns": 4, "reach": 700000, "engagement": 35000}
    ],
    "engagementTrend": [
        {"date": "2024-06-01", "engagement": 1200, "reach": 45000},
        {"date": "2024-06-08", "engagement": 1800, "reach": 62000},
        {"date": "2024-06-15", "engagement": 2500, "reach": 89000},
        {"date": "2024-06-22", "engagement": 3200, "reach": 112000},
        {"date": "2024-06-29", "engagement": 2800, "reach": 98000}
    ],
    "influencerPerformance": [
        {"name": "Emma Chen", "platform": "Instagram", "engagementRate": 4.2, "conversions": 450, "roi": 4.5},
        {"name": "Mike Roberts", "platform": "YouTube", "engagementRate": 3.8, "conversions": 320, "roi": 3.9},
        {"name": "Sarah Wilson", "platform": "Instagram", "engagementRate": 5.1, "conversions": 280, "roi": 4.2},
        {"name": "Alex Kumar", "platform": "YouTube", "engagementRate": 3.2, "conversions": 190, "roi": 3.1}
    ]
}

@app.route('/api/youtube/search', methods=['GET'])
def youtube_search():
    q = request.args.get('q')
    if not q:
        return jsonify({"error": "Query parameter 'q' is required"}), 400

    youtube = build("youtube", "v3", developerKey=API_KEY)

    try:
        search_response = youtube.search().list(
            part="snippet",
            q=q,
            type="channel",
            maxResults=10
        ).execute()

        items = search_response.get("items", [])
        if not items:
            return jsonify({"items": []})

        channel_ids = [item["snippet"]["channelId"] for item in items]

        channels_response = youtube.channels().list(
            part="snippet,statistics,topicDetails",
            id=",".join(channel_ids)
        ).execute()

        channels = channels_response.get("items", [])

        enhanced_items = []
        for search_item in items:
            channel_id = search_item["snippet"]["channelId"]
            channel = next((ch for ch in channels if ch["id"] == channel_id), None)
            if not channel:
                continue

            stats = channel.get("statistics", {})
            subs = int(stats.get("subscriberCount", 0))
            views = int(stats.get("viewCount", 0))
            videos = int(stats.get("videoCount", 0))
            engagement_rate = round((views / subs) if subs > 0 else 0, 2)

            topics = channel.get("topicDetails", {}).get("topicCategories", [])
            category = "Other"
            if topics:
                category = topics[0].split("/")[-1].replace("_", " ")
            else:
                description_lower = channel["snippet"].get("description", "").lower()
                title_lower = channel["snippet"].get("title", "").lower()
                text = description_lower + title_lower
                if any(word in text for word in ["game", "gaming", "play"]):
                    category = "Gaming"
                elif any(word in text for word in ["tech", "software", "gadget"]):
                    category = "Tech"
                elif any(word in text for word in ["movie", "comic", "superhero", "pop culture"]):
                    category = "Entertainment"
                elif any(word in text for word in ["music", "song", "album"]):
                    category = "Music"

            item = {
                "id": {"channelId": channel_id},
                "snippet": search_item["snippet"],
                "statistics": stats,
                "engagementRate": engagement_rate
            }
            item["snippet"]["categoryId"] = category

            enhanced_items.append(item)

        return jsonify({"items": enhanced_items})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/influencers', methods=['GET'])
def get_influencers():
    return jsonify(influencers_data)

@app.route('/api/campaigns', methods=['GET'])
def get_campaigns():
    return jsonify(campaigns_data)

@app.route('/api/templates', methods=['GET', 'POST'])
def handle_templates():
    if request.method == 'GET':
        return jsonify(templates_data)
    elif request.method == 'POST':
        new_template = request.json
        new_template['id'] = len(templates_data) + 1
        new_template['usedCount'] = 0
        templates_data.append(new_template)
        return jsonify(new_template), 201

@app.route('/api/templates/<int:template_id>', methods=['DELETE'])
def delete_template(template_id):
    global templates_data
    templates_data = [t for t in templates_data if t['id'] != template_id]
    return jsonify({"success": True}), 200

@app.route('/api/outreach/send', methods=['POST'])
def send_outreach():
    data = request.json
    # Simulate sending
    return jsonify({"success": True}), 200

@app.route('/api/collaborators', methods=['GET', 'POST'])
def handle_collaborators():
    if request.method == 'GET':
        return jsonify(collaborators_data)
    elif request.method == 'POST':
        new_collab = request.json
        new_collab['id'] = len(collaborators_data) + 1
        new_collab['joinDate'] = datetime.date.today().isoformat()
        new_collab['status'] = 'active'
        collaborators_data.append(new_collab)
        return jsonify(new_collab), 201

@app.route('/api/profile', methods=['PUT'])
def update_profile():
    updated_data = request.json
    global user_data
    user_data.update(updated_data)
    return jsonify(user_data), 200

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    return jsonify({
        "user": user_data,
        "stats": dashboard_stats,
        "campaigns": dashboard_campaigns,
        "recentActivity": dashboard_recent_activity
    })

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    range_param = request.args.get('range', '30d')
    # Ignore range for demo
    return jsonify(analytics_data)

@app.route('/api/analytics/export', methods=['POST'])
def export_analytics():
    # Simulate CSV export
    csv_content = "campaign,reach,engagement\nSummer Launch,450000,22500\n"  # Example data
    return csv_content, 200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=analytics-export.csv'
    }

if __name__ == '__main__':
    app.run(port=5000, debug=True)