gcloud compute instances suspend k8s-control-plane --zone=asia-south2-a --quiet
gcloud compute instances suspend k8s-worker-1 --zone=asia-south2-a --quiet
gcloud compute instances suspend k8s-worker-2 --zone=asia-south2-a --quiet

gcloud sql instances patch statusbus-postgres --activation-policy=NEVER
