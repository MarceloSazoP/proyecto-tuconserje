import Foundation

struct Message: Codable {
    let id: String
    let content: String
    let senderId: String
    let receiverId: String
    let read: Bool
    let createdAt: Date
    let updatedAt: Date
    
    enum CodingKeys: String, CodingKey {
        case id
        case content
        case senderId = "sender_id"
        case receiverId = "receiver_id"
        case read
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}