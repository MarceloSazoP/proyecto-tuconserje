import Foundation

struct Request: Codable {
    let id: String
    let title: String
    let description: String
    let status: RequestStatus
    let createdBy: String
    let assignedTo: String?
    let createdAt: Date
    let updatedAt: Date
    
    enum CodingKeys: String, CodingKey {
        case id
        case title
        case description
        case status
        case createdBy = "created_by"
        case assignedTo = "assigned_to"
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}

enum RequestStatus: String, Codable {
    case pending = "PENDING"
    case inProgress = "IN_PROGRESS"
    case completed = "COMPLETED"
    case cancelled = "CANCELLED"
}