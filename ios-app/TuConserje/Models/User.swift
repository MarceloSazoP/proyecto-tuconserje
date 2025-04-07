import Foundation

struct User: Codable {
    let id: String
    let name: String
    let email: String
    let role: UserRole
    let createdAt: Date
    let updatedAt: Date
    
    enum CodingKeys: String, CodingKey {
        case id
        case name
        case email
        case role
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}

enum UserRole: String, Codable {
    case resident = "RESIDENT"
    case concierge = "CONCIERGE"
    case admin = "ADMIN"
}