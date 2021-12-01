import React, { useState, useEffect } from "react";
import { addReview, getReviews } from "../../utils/apiWrapper";
import {  Form, FormGroup, Input, Label, Button, Modal, ModalBody, ModalHeader } from "reactstrap";

const ReviewsModal = ( {game, isModalOpen, closeModal} ) => {

    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState("");
    const [hideInput, setHideInput] = useState(false);

    const fetchReviews = async () => {
        let res = await getReviews(game.gameId);
        if (res) {
            console.log(res.data);
            setReviews(res.data);
            res.data.forEach(function (review) {
                if (review.userId === 0) {
                    setHideInput(true);
                }
            })
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmitReview = async () => {
        let res = await addReview(game.gameId, 0, { review: `\"${userReview}\"`});
        if (res) {
            fetchReviews();
        }
    }

    return (
        <Modal isOpen={isModalOpen} toggle={closeModal}>
            <ModalHeader>
                Reviews for {game.name}
            </ModalHeader>
            <ModalBody>
                {reviews.length > 0 ? reviews.map((review) => { return (
                    <div key={review.userId}>
                        <p>{review.userId === 0 ? `Your review: \"${review.review}\"`: `User ${review.userId} says: \"${review.review}\"`}</p>
                    </div>
                )
                }) : <h3 style={{textAlign: "center", marginBottom: 20}}>No Reviews yet!</h3>}
                {!hideInput && 
                    <div>
                        <Form>
                            <FormGroup>
                                <Input
                                    type="text"
                                    value={userReview}
                                    onChange={(e) => setUserReview(e.target.value)}
                                    placeholder="Write your own review here"
                                    required
                                />
                            </FormGroup>
                        </Form>
                        <div style={{textAlign: "center"}}>
                            <Button onClick={handleSubmitReview}>
                                Submit Review
                            </Button>
                        </div>
                    </div>
                }

            </ModalBody>
        </Modal>
    )
}

export default ReviewsModal;